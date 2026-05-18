const DataService=(()=>{
let doctors=[]
let visitors=0

const fetchCSV=async()=>{
const r=await fetch(CONFIG.CSV_URL+"#"+Date.now())
if(!r.ok)throw new Error("CSV fetch failed")
return parseCSV(await r.text())
}

const mapDoctor=d=>{
const searchable=[
d.name,
d.specialty,
d.degree,
d.chamber_name,
d.chamber_address,
d.area,
d.city,
d.phone
].join(" ")
return{
...d,
searchable:normalize(searchable)
}
}

const loadDoctors=async()=>{
const rows=await fetchCSV()
doctors=rows.map(mapDoctor)
return doctors
}

const getDoctors=()=>doctors

const getAreas=()=>[
...new Set(doctors.map(v=>v.area).filter(Boolean))
].sort()

const getSpecs=()=>[
...new Set(doctors.map(v=>v.specialty).filter(Boolean))
].sort()

const searchDoctors=(q="",spec="",area="")=>{
const res=doctors.filter(d=>{
const mq=!q||fuzzy(q,d.searchable)>0
const ms=!spec||d.specialty===spec
const ma=!area||d.area===area
return mq&&ms&&ma
})
if(q){
res.sort((a,b)=>
fuzzy(q,b.searchable)-fuzzy(q,a.searchable)
)
}
return res
}

const submitDoctor=async(data)=>{
const r=await fetch(CONFIG.GAS_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
action:"submitDoctor",
data
})
})
return r.json()
}

const updateVisitor=async()=>{
try{
await fetch(CONFIG.GAS_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
action:"pageview",
sid:uid()
})
})
}catch{}
}

const getVisitors=async()=>{
try{
const r=await fetch(CONFIG.GAS_URL+"?action=getStats")
const j=await r.json()
visitors=j.total||0
return visitors
}catch{
return visitors
}
}

const getNotice=()=>{
const row=doctors[0]||{}
return row.notice||""
}

const tgMsg=async(msg)=>{
const u=`https://api.telegram.org/bot${CONFIG.TG_BOT}/sendMessage`
return fetch(u,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
chat_id:CONFIG.TG_CHAT,
text:msg
})
})
}

const tgPhoto=async(file,caption="Feedback Image")=>{
const fd=new FormData()
fd.append("chat_id",CONFIG.TG_CHAT)
fd.append("caption",caption)
fd.append("photo",file)
return fetch(
`https://api.telegram.org/bot${CONFIG.TG_BOT}/sendPhoto`,
{
method:"POST",
body:fd
}
)
}

const tgVoice=async(blob)=>{
const fd=new FormData()
fd.append("chat_id",CONFIG.TG_CHAT)
fd.append("voice",blob,"voice.webm")
return fetch(
`https://api.telegram.org/bot${CONFIG.TG_BOT}/sendVoice`,
{
method:"POST",
body:fd
}
)
}

return{
loadDoctors,
getDoctors,
getAreas,
getSpecs,
searchDoctors,
submitDoctor,
updateVisitor,
getVisitors,
getNotice,
tgMsg,
tgPhoto,
tgVoice
}
})()
