const App=(()=>{
let allDoctors=[];
let selectedSpecialty=null;
let isOnline=navigator.onLine;
let mediaRecorder=null;
let voiceChunks=[];
let voiceStartTime=0;
let voiceTimerInterval=null;
let voiceAutoStopTimeout=null;

const currentFilters={
searchQuery:"",
area:""
};

const $=s=>document.querySelector(s);

const dom={};

function cacheDom(){
dom.announcementBar=$("#announcementBar");
dom.announcementText=$("#announcementText");
dom.announcementDismiss=$("#announcementDismiss");
dom.hamburgerBtn=$("#hamburgerBtn");
dom.slideMenu=$("#slideMenu");
dom.slideMenuClose=$("#slideMenuClose");
dom.slideMenuBackdrop=$("#slideMenuBackdrop");
dom.searchInput=$("#searchInput");
dom.searchClear=$("#searchClear");
dom.specialtyPills=$("#specialtyPills");
dom.areaFilter=$("#areaFilter");
dom.visitorCount=$("#visitorCount");
dom.resultsInfo=$("#resultsInfo");
dom.doctorCards=$("#doctorCards");
dom.loadingSkeleton=$("#loadingSkeleton");
dom.emptyState=$("#emptyState");
dom.errorState=$("#errorState");
dom.retryBtn=$("#retryBtn");
dom.fabAddDoctor=$("#fabAddDoctor");
dom.fabFeedback=$("#fabFeedback");
dom.addDoctorModal=$("#addDoctorModal");
dom.addDoctorForm=$("#addDoctorForm");
dom.addDoctorClose=$("#addDoctorClose");
dom.submitDoctorBtn=$("#submitDoctorBtn");
dom.addDoctorSuccess=$("#addDoctorSuccess");
dom.addDoctorDone=$("#addDoctorDone");
dom.feedbackModal=$("#feedbackModal");
dom.feedbackClose=$("#feedbackClose");
dom.feedbackText=$("#feedbackText");
dom.feedbackImage=$("#feedbackImage");
dom.feedbackVoiceBtn=$("#feedbackVoiceBtn");
dom.voiceStatus=$("#voiceStatus");
dom.voiceTimer=$("#voiceTimer");
dom.voiceStopBtn=$("#voiceStopBtn");
dom.feedbackSubmit=$("#feedbackSubmit");
dom.feedbackSuccess=$("#feedbackSuccess");
dom.noticeModal=$("#noticeModal");
dom.noticeClose=$("#noticeClose");
dom.noticeModalBody=$("#noticeModalBody");
dom.detailModal=$("#detailModal");
dom.detailClose=$("#detailClose");
dom.detailModalBody=$("#detailModalBody");
dom.detailModalTitle=$("#detailModalTitle");
dom.toastContainer=$("#toastContainer");
}

function setupEventListeners(){
dom.hamburgerBtn?.addEventListener("click",toggleSlideMenu);
dom.slideMenuClose?.addEventListener("click",closeSlideMenu);
dom.slideMenuBackdrop?.addEventListener("click",closeSlideMenu);

dom.searchInput?.addEventListener(
"input",
Utils.debounce(handleSearch,CONFIG.SEARCH_DEBOUNCE_MS||250)
);

dom.searchClear?.addEventListener("click",clearSearch);
dom.areaFilter?.addEventListener("change",handleAreaFilter);

dom.fabAddDoctor?.addEventListener("click",openAddDoctorModal);
dom.addDoctorClose?.addEventListener("click",closeAddDoctorModal);
dom.addDoctorDone?.addEventListener("click",closeAddDoctorModal);
dom.addDoctorForm?.addEventListener("submit",handleDoctorSubmit);

dom.fabFeedback?.addEventListener("click",openFeedbackModal);
dom.feedbackClose?.addEventListener("click",closeFeedbackModal);
dom.feedbackSubmit?.addEventListener("click",handleFeedbackSubmit);

dom.feedbackVoiceBtn?.addEventListener("click",toggleVoiceRecording);
dom.voiceStopBtn?.addEventListener("click",stopVoiceRecording);

dom.noticeClose?.addEventListener("click",()=>hideModal(dom.noticeModal));
dom.detailClose?.addEventListener("click",()=>hideModal(dom.detailModal));

dom.retryBtn?.addEventListener("click",loadInitialData);

dom.announcementDismiss?.addEventListener("click",dismissAnnouncement);

dom.doctorCards?.addEventListener("click",handleCardAction);

document.addEventListener("click",e=>{
if(e.target.classList.contains("modal__backdrop")){
hideModal(e.target.closest(".modal"));
}
});

document.addEventListener("keydown",e=>{
if(e.key==="Escape"){
closeSlideMenu();
document.querySelectorAll(".modal").forEach(modal=>{
modal.hidden=true;
});
}
});
}

async function init(){
cacheDom();
setupEventListeners();
setupOnlineStatus();
await loadInitialData();
startVisitorRefresh();
checkNotice();
}

async function loadInitialData(){
showLoading(true);
hideError();

try{
allDoctors=await DataService.fetchDoctors(true);

if(!Array.isArray(allDoctors)){
allDoctors=[];
}

renderFilters();
applyFiltersAndRender();

DataService.recordPageview?.();

}catch(error){
console.error(error);
showError();

}finally{
showLoading(false);
}
}

function renderFilters(){
renderSpecialtyPills();
renderAreaOptions();
}

function renderSpecialtyPills(){
const specialties=[
...new Set(
allDoctors
.map(d=>d.specialty?.trim())
.filter(Boolean)
)
].sort();

dom.specialtyPills.innerHTML="";

dom.specialtyPills.appendChild(
createPill("All",null,!selectedSpecialty)
);

specialties.forEach(spec=>{
dom.specialtyPills.appendChild(
createPill(spec,spec,selectedSpecialty===spec)
);
});
}

function createPill(label,value,isActive){
const pill=document.createElement("button");

pill.type="button";
pill.className=`specialty-pill${isActive?" specialty-pill--active":""}`;
pill.textContent=label;
pill.dataset.value=value||"";

pill.addEventListener("click",()=>{
selectedSpecialty=value||null;
renderSpecialtyPills();
applyFiltersAndRender();
});

return pill;
}

function renderAreaOptions(){
const areas=[
...new Set(
allDoctors
.map(d=>d.area?.trim())
.filter(Boolean)
)
].sort();

dom.areaFilter.innerHTML=`<option value="">📍 All Areas</option>`;

areas.forEach(area=>{
const option=document.createElement("option");
option.value=area;
option.textContent=area;
dom.areaFilter.appendChild(option);
});

dom.areaFilter.value=currentFilters.area;
}

function handleSearch(e){
currentFilters.searchQuery=e.target.value.trim();

if(currentFilters.searchQuery){
dom.searchClear.classList.add("search-clear--visible");
dom.searchClear.hidden=false;
}else{
dom.searchClear.classList.remove("search-clear--visible");
dom.searchClear.hidden=true;
}

applyFiltersAndRender();
}

function clearSearch(){
dom.searchInput.value="";
currentFilters.searchQuery="";
dom.searchClear.hidden=true;
dom.searchClear.classList.remove("search-clear--visible");
applyFiltersAndRender();
dom.searchInput.focus();
}

function handleAreaFilter(e){
currentFilters.area=e.target.value;
applyFiltersAndRender();
}

function applyFiltersAndRender(){
let filtered=[...allDoctors];

if(selectedSpecialty){
filtered=filtered.filter(doc=>doc.specialty===selectedSpecialty);
}

if(currentFilters.area){
filtered=filtered.filter(doc=>doc.area===currentFilters.area);
}

if(currentFilters.searchQuery){
const query=Utils.normalize(currentFilters.searchQuery);

filtered=filtered
.map(doc=>{
const score=Utils.fuzzyMatchScore(
query,
Utils.getSearchableText(doc)
);

return{doc,score};
})
.filter(item=>item.score>0)
.sort((a,b)=>b.score-a.score)
.map(item=>item.doc);
}

renderDoctorCards(filtered);

dom.resultsInfo.textContent=`${filtered.length} doctor${filtered.length!==1?"s":""} found`;

dom.emptyState.hidden=filtered.length!==0;
}

function renderDoctorCards(doctors){
dom.doctorCards.innerHTML="";

if(!doctors.length){
dom.emptyState.hidden=false;
return;
}

dom.emptyState.hidden=true;

doctors.forEach(doc=>{
dom.doctorCards.appendChild(createDoctorCard(doc));
});
}

function createDoctorCard(doc){
const card=document.createElement("article");

card.className="card";
card.dataset.doctorId=doc.doctor_id||"";
card.dataset.doctor=encodeURIComponent(JSON.stringify(doc));

const verified=String(doc.verification||"")
.toLowerCase()
.includes("verified");

const badge=verified
?`<span class="card__badge card__badge--verified">✅ Verified</span>`
:`<span class="card__badge card__badge--listed">🟡 Listed</span>`;

const sessions=[
doc.session_1,
doc.session_2,
doc.session_3
]
.filter(Boolean)
.map(item=>`<span class="card__session-item">🕐 ${Utils.sanitizeHTML(item)}</span>`)
.join("");

const note=doc.time_description
?`<div class="card__session-note">📝 ${Utils.sanitizeHTML(doc.time_description)}</div>`
:"";

card.innerHTML=`
<div class="card__header">
<h3 class="card__name">${Utils.sanitizeHTML(doc.name||"Unknown Doctor")}</h3>
<span class="card__specialty">${Utils.sanitizeHTML(doc.specialty||"General")}</span>
</div>

${doc.degree?`<div class="card__degree">${Utils.sanitizeHTML(doc.degree)}</div>`:""}

<div class="card__chamber">
🏥 ${Utils.sanitizeHTML(doc.chamber_name||"Unknown Chamber")}
</div>

<div class="card__address">
📍 ${Utils.sanitizeHTML(doc.chamber_address||doc.area||"Unknown Area")}, ${Utils.sanitizeHTML(doc.city||CONFIG.DEFAULT_CITY)}
</div>

${sessions||note?`
<div class="card__sessions">
${sessions}
${note}
</div>
`:""}

<div class="card__fees">
💰 ${Utils.sanitizeHTML(doc.fees||"Not specified")}
</div>

${badge}

<div class="card__actions">

${doc.phone?`
<a
href="tel:${Utils.cleanPhoneForTel(doc.phone)}"
class="card__action-btn"
aria-label="Call doctor"
>
📞 Call
</a>
`:""}

${doc.whatsapp?`
<a
href="https://wa.me/${Utils.cleanPhoneForTel(doc.whatsapp)}"
target="_blank"
rel="noopener"
class="card__action-btn"
aria-label="WhatsApp"
>
💬 WhatsApp
</a>
`:""}

<button
type="button"
class="card__action-btn card__share-btn"
data-action="share"
>
📤 Share
</button>

<button
type="button"
class="card__action-btn card__details-btn"
data-action="details"
>
🔍 Details
</button>

</div>

<div class="card__footer">
🕒 Updated: ${
doc.submitted_at
?new Date(doc.submitted_at).toLocaleDateString()
:"Unknown"
}
</div>
`;

return card;
}

function handleCardAction(e){
const btn=e.target.closest("button");

if(!btn)return;

const card=btn.closest(".card");

if(!card)return;

const doc=JSON.parse(
decodeURIComponent(card.dataset.doctor)
);

if(btn.dataset.action==="share"){
PngShare.generateAndShare?.(doc,card);
}

if(btn.dataset.action==="details"){
showDoctorDetails(doc);
}
}

function showDoctorDetails(doc){
dom.detailModalTitle.textContent=doc.name||"Doctor Details";

dom.detailModalBody.innerHTML=`
<p><strong>Specialty:</strong> ${Utils.sanitizeHTML(doc.specialty||"N/A")}</p>
<p><strong>Degree:</strong> ${Utils.sanitizeHTML(doc.degree||"N/A")}</p>
<p><strong>Chamber:</strong> ${Utils.sanitizeHTML(doc.chamber_name||"N/A")}</p>
<p><strong>Address:</strong> ${Utils.sanitizeHTML(doc.chamber_address||doc.area||"N/A")}</p>
<p><strong>Phone:</strong> ${Utils.sanitizeHTML(doc.phone||"N/A")}</p>
<p><strong>WhatsApp:</strong> ${Utils.sanitizeHTML(doc.whatsapp||"N/A")}</p>
<p><strong>Fees:</strong> ${Utils.sanitizeHTML(doc.fees||"N/A")}</p>
`;

showModal(dom.detailModal);
}

function openAddDoctorModal(){
dom.addDoctorModal.hidden=false;
dom.addDoctorForm.hidden=false;
dom.addDoctorSuccess.hidden=true;
dom.addDoctorForm.reset();

const city=$("#docCity");

if(city){
city.value=CONFIG.DEFAULT_CITY||"Cooch Behar";
}
}

function closeAddDoctorModal(){
hideModal(dom.addDoctorModal);
dom.addDoctorForm.hidden=false;
dom.addDoctorSuccess.hidden=true;
}

async function handleDoctorSubmit(e){
e.preventDefault();

if(!dom.addDoctorForm.checkValidity()){
dom.addDoctorForm.reportValidity();
return;
}

dom.submitDoctorBtn.disabled=true;
dom.submitDoctorBtn.textContent="Submitting...";

const formData={
name:$("#docName").value.trim(),
specialty:$("#docSpecialty").value.trim(),
degree:$("#docDegree").value.trim(),
chamber_name:$("#docChamber").value.trim(),
chamber_address:$("#docAddress").value.trim(),
area:$("#docArea").value.trim(),
city:$("#docCity").value.trim()||CONFIG.DEFAULT_CITY,
phone:$("#docPhone").value.trim(),
whatsapp:$("#docWhatsApp").value.trim(),
session_1:$("#docSession1").value.trim(),
session_2:$("#docSession2").value.trim(),
session_3:$("#docSession3").value.trim(),
time_description:$("#docTimingNote").value.trim(),
fees:$("#docFees").value.trim(),
submitted_by:$("#submitterName").value.trim(),
submitter_address:$("#submitterAddress").value.trim(),
submitter_phone:$("#submitterPhone").value.trim()
};

try{
const result=await DataService.submitDoctor(formData);

if(!result?.success){
throw new Error("Submission failed");
}

dom.addDoctorForm.hidden=true;
dom.addDoctorSuccess.hidden=false;

DataService.invalidateCache?.();

loadInitialData();

showToast("Doctor added successfully");

}catch(error){
console.error(error);
showToast("Submission failed",true);

}finally{
dom.submitDoctorBtn.disabled=false;
dom.submitDoctorBtn.textContent="Submit Doctor";
}
}

function openFeedbackModal(){
showModal(dom.feedbackModal);

dom.feedbackText.value="";
dom.feedbackImage.value="";
dom.feedbackSuccess.hidden=true;
}

function closeFeedbackModal(){
hideModal(dom.feedbackModal);
}

async function handleFeedbackSubmit(){
const text=dom.feedbackText.value.trim();
const image=dom.feedbackImage.files?.[0];

if(!text && !image){
showToast("Enter message or image",true);
return;
}

dom.feedbackSubmit.disabled=true;
dom.feedbackSubmit.textContent="Sending...";

try{
await sendFeedbackToTelegram(text,image);

dom.feedbackSuccess.hidden=false;

setTimeout(()=>{
closeFeedbackModal();
},1500);

showToast("Feedback sent");

}catch(error){
console.error(error);
showToast("Feedback failed",true);

}finally{
dom.feedbackSubmit.disabled=false;
dom.feedbackSubmit.textContent="Submit Feedback";
}
}

async function sendFeedbackToTelegram(text,imageFile){
const token=CONFIG.TELEGRAM_BOT_TOKEN;
const chatId=CONFIG.TELEGRAM_CHAT_ID;

if(!token || !chatId){
throw new Error("Telegram config missing");
}

const url=`https://api.telegram.org/bot${token}`;

if(imageFile){
const formData=new FormData();

formData.append("chat_id",chatId);
formData.append("photo",imageFile);
formData.append("caption",text||"Feedback");

const response=await fetch(`${url}/sendPhoto`,{
method:"POST",
body:formData
});

if(!response.ok){
throw new Error("Image send failed");
}

return;
}

const response=await fetch(`${url}/sendMessage`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
chat_id:chatId,
text:text
})
});

if(!response.ok){
throw new Error("Message send failed");
}
}

async function toggleVoiceRecording(){
if(mediaRecorder?.state==="recording"){
stopVoiceRecording();
return;
}

try{
const stream=await navigator.mediaDevices.getUserMedia({
audio:true
});

voiceChunks=[];

mediaRecorder=new MediaRecorder(stream);

mediaRecorder.ondataavailable=e=>{
if(e.data.size>0){
voiceChunks.push(e.data);
}
};

mediaRecorder.onstop=async()=>{
clearInterval(voiceTimerInterval);
clearTimeout(voiceAutoStopTimeout);

const blob=new Blob(voiceChunks,{
type:"audio/webm"
});

stream.getTracks().forEach(track=>track.stop());

dom.voiceStatus.hidden=true;
dom.feedbackVoiceBtn.hidden=false;

if(blob.size>0){
await sendVoiceToTelegram(blob);
}
};

mediaRecorder.start();

voiceStartTime=Date.now();

dom.voiceStatus.hidden=false;
dom.feedbackVoiceBtn.hidden=true;

updateVoiceTimer();

voiceTimerInterval=setInterval(updateVoiceTimer,1000);

voiceAutoStopTimeout=setTimeout(()=>{
stopVoiceRecording();
},(CONFIG.VOICE_MAX_DURATION||60)*1000);

}catch(error){
console.error(error);
showToast("Microphone permission denied",true);
}
}

function stopVoiceRecording(){
if(mediaRecorder?.state==="recording"){
mediaRecorder.stop();
}
}

function updateVoiceTimer(){
const seconds=Math.floor((Date.now()-voiceStartTime)/1000);
const mins=Math.floor(seconds/60);
const secs=String(seconds%60).padStart(2,"0");

dom.voiceTimer.textContent=`${mins}:${secs}`;
}

async function sendVoiceToTelegram(blob){
const token=CONFIG.TELEGRAM_BOT_TOKEN;
const chatId=CONFIG.TELEGRAM_CHAT_ID;

const formData=new FormData();

formData.append("chat_id",chatId);
formData.append("voice",blob,"voice.webm");

const response=await fetch(
`https://api.telegram.org/bot${token}/sendVoice`,
{
method:"POST",
body:formData
}
);

if(!response.ok){
throw new Error("Voice upload failed");
}

showToast("Voice feedback sent");
}

async function updateVisitorCount(){
try{
const count=await DataService.fetchVisitorCount();

dom.visitorCount.textContent=Number(count||0).toLocaleString();

}catch(error){
console.error(error);
}
}

function startVisitorRefresh(){
updateVisitorCount();

setInterval(()=>{
updateVisitorCount();
},CONFIG.VISITOR_REFRESH_INTERVAL||30000);
}

async function checkNotice(){
try{
const notice=await DataService.fetchNotice?.();

if(!notice)return;

const dismissed=Utils.storage.get("notice_dismissed",false);

if(dismissed)return;

const safeNotice=Utils.sanitizeHTML(notice)
.replace(
/(https?:\/\/[^\s]+)/g,
'<a href="$1" target="_blank" rel="noopener">$1</a>'
);

dom.announcementText.innerHTML=safeNotice;
dom.noticeModalBody.innerHTML=safeNotice;

dom.announcementBar.hidden=false;
dom.noticeModal.hidden=false;

}catch(error){
console.error(error);
}
}

function dismissAnnouncement(){
dom.announcementBar.hidden=true;
dom.noticeModal.hidden=true;

Utils.storage.set("notice_dismissed",true);
}

function toggleSlideMenu(){
const opened=dom.slideMenu.getAttribute("aria-hidden")==="false";

if(opened){
closeSlideMenu();
return;
}

dom.slideMenu.setAttribute("aria-hidden","false");
dom.hamburgerBtn.setAttribute("aria-expanded","true");

document.body.style.overflow="hidden";
}

function closeSlideMenu(){
dom.slideMenu.setAttribute("aria-hidden","true");
dom.hamburgerBtn.setAttribute("aria-expanded","false");

document.body.style.overflow="";
}

function showLoading(show){
dom.loadingSkeleton.hidden=!show;
dom.doctorCards.hidden=show;

if(show){
dom.emptyState.hidden=true;
}
}

function showError(){
dom.errorState.hidden=false;
dom.doctorCards.hidden=true;
}

function hideError(){
dom.errorState.hidden=true;
dom.doctorCards.hidden=false;
}

function showToast(message,isError=false){
const toast=document.createElement("div");

toast.className="toast";
toast.textContent=message;

if(isError){
toast.style.background="#c53030";
}

dom.toastContainer.appendChild(toast);

setTimeout(()=>{
toast.remove();
},CONFIG.TOAST_DURATION||3000);
}

function setupOnlineStatus(){
window.addEventListener("online",()=>{
isOnline=true;
showToast("Back online");
});

window.addEventListener("offline",()=>{
isOnline=false;
showToast("You are offline",true);
});
}

function showModal(modal){
if(!modal)return;

modal.hidden=false;
document.body.style.overflow="hidden";
}

function hideModal(modal){
if(!modal)return;

modal.hidden=true;

const openModal=document.querySelector(".modal:not([hidden])");

if(!openModal){
document.body.style.overflow="";
}
}

document.addEventListener("DOMContentLoaded",init);

return{
init
};

})();
