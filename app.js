let state={
q:"",
spec:"",
area:"",
voice:null,
rec:null
}

const els={
list:$("#doctorList"),
search:$("#searchInput"),
area:$("#areaFilter"),
spec:$("#specWrap"),
visitor:$("#visitorCount"),
empty:$("#emptyState"),
drawer:$("#drawer"),
notice:$("#noticeBar"),
noticeText:$("#noticeText")
}

const badge=v=>{
const ok=normalize(v).includes("verified")
return `
<div class="badge ${ok?"verified":"listed"}">
${ok?"Verified":"Listed by community"}
</div>
`
}

const card=d=>`
<div class="card">
<h3>${esc(d.name)}</h3>
<div class="meta">${esc(d.specialty)}</div>
<div>${esc(d.degree||"")}</div>

<div class="rowMeta">
🏥 ${esc(d.chamber_name||"-")}
</div>

<div class="meta">
📍 ${esc(d.area||"")}${d.city?", "+esc(d.city):""}
</div>

<div class="meta">
🕐 ${esc(d.session_1||"-")}
</div>

${d.session_2?`<div class="meta">🕐 ${esc(d.session_2)}</div>`:""}
${d.session_3?`<div class="meta">🕐 ${esc(d.session_3)}</div>`:""}

<div class="meta">
💰 ${esc(d.fees||"-")}
</div>

${badge(d.verification)}

<div class="row">
<a class="btn" href="${telLink(d.phone)}">📞 Call</a>
<a class="btn" target="_blank" href="${waLink(d.whatsapp||d.phone)}">💬 WhatsApp</a>
</div>

<div class="row">
<button class="btn secondary shareBtn">📤 Share</button>
<button class="btn secondary detailsBtn">🔍 Details</button>
</div>

<div class="meta">
Updated: ${esc(d.submitted_at||"-")}
</div>
</div>
`

const render=list=>{
els.list.innerHTML=list.map(card).join("")
els.empty.classList.toggle("hidden",!!list.length)

$$(".shareBtn").forEach((b,i)=>{
b.onclick=()=>sharePNG(
$$(".card")[i],
DataService.getDoctors()[i]?.name||"doctor"
)
})

$$(".detailsBtn").forEach((b,i)=>{
b.onclick=()=>{
const d=list[i]
alert(`
Doctor: ${d.name}
Specialty: ${d.specialty}
Chamber: ${d.chamber_name}
Phone: ${d.phone}
Address: ${d.chamber_address}
Timing: ${d.time_description}
`)
}
})
}

const refresh=()=>{
render(
DataService.searchDoctors(
state.q,
state.spec,
state.area
)
)
}

const renderSpecs=()=>{
els.spec.innerHTML=[
`<button class="active" data-v="">All</button>`,
...DataService.getSpecs().map(v=>
`<button data-v="${esc(v)}">${esc(v)}</button>`
)
].join("")

$$(".specWrap button").forEach(b=>{
b.onclick=()=>{
$$(".specWrap button")
.forEach(x=>x.classList.remove("active"))
b.classList.add("active")
state.spec=b.dataset.v
refresh()
}
})
}

const renderAreas=()=>{
els.area.innerHTML=`
<option value="">All Areas</option>
${DataService.getAreas().map(v=>
`<option value="${esc(v)}">${esc(v)}</option>`
).join("")}
`
}

const initSearch=()=>{
els.search.oninput=debounce(e=>{
state.q=e.target.value
refresh()
},CONFIG.SEARCH_DELAY)

els.area.onchange=e=>{
state.area=e.target.value
refresh()
}
}

const modal=(id,show=1)=>{
$(id).classList.toggle("hidden",!show)
}

const initModal=()=>{
$("#addFab").onclick=()=>modal("#doctorModal")
$("#feedbackFab").onclick=()=>modal("#feedbackModal")

$$("[data-close]").forEach(b=>{
b.onclick=()=>b.closest(".modal")
.classList.add("hidden")
})
}

const initDrawer=()=>{
$("#menuBtn").onclick=()=>{
els.drawer.classList.toggle("open")
}
}

const initDoctorForm=()=>{
$("#doctorForm").onsubmit=async e=>{
e.preventDefault()
const fd=new FormData(e.target)
const data=Object.fromEntries(fd.entries())

try{
const r=await DataService.submitDoctor(data)
toast(`Submitted ${r.doctor_id||""}`)
e.target.reset()
modal("#doctorModal",0)
}catch{
toast("Submission failed")
}
}
}

const initFeedback=()=>{
$("#voiceBtn").onclick=async()=>{
if(!navigator.mediaDevices)return
const s=await navigator.mediaDevices.getUserMedia({audio:1})
const rec=new MediaRecorder(s)
const a=[]

rec.ondataavailable=e=>a.push(e.data)

rec.onstop=()=>{
state.voice=new Blob(a,{type:"audio/webm"})
toast("Voice recorded")
}

rec.start()
state.rec=rec
toast("Recording...")

setTimeout(()=>{
rec.stop()
s.getTracks().forEach(t=>t.stop())
},15000)
}

$("#feedbackForm").onsubmit=async e=>{
e.preventDefault()

const txt=$("#feedbackText").value.trim()
const img=$("#feedbackImage").files[0]

try{
if(txt){
await DataService.tgMsg(
`💬 Feedback\n\n${txt}`
)
}

if(img){
await DataService.tgPhoto(img)
}

if(state.voice){
await DataService.tgVoice(state.voice)
}

toast("Feedback sent")
e.target.reset()
state.voice=null
modal("#feedbackModal",0)

}catch{
toast("Failed")
}
}
}

const initNotice=()=>{
const n=DataService.getNotice()
if(!n)return

if(load("noticeClosed")===n)return

els.notice.classList.remove("hidden")
els.noticeText.innerHTML=autoLink(n)

$("#closeNotice").onclick=()=>{
save("noticeClosed",n)
els.notice.classList.add("hidden")
}
}

const initVisitors=async()=>{
await DataService.updateVisitor()

const loadVisitors=async()=>{
els.visitor.textContent=
(await DataService.getVisitors())
.toLocaleString()
}

loadVisitors()

setInterval(
loadVisitors,
CONFIG.VISITOR_REFRESH
)
}

const boot=async()=>{
try{
await DataService.loadDoctors()
renderAreas()
renderSpecs()
initSearch()
refresh()
initNotice()
initVisitors()
}catch{
toast("Data loading failed")
}

initDrawer()
initModal()
initDoctorForm()
initFeedback()

if("serviceWorker"in navigator){
navigator.serviceWorker.register("sw.js")
}
}

boot()
