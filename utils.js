const $=s=>document.querySelector(s)
const $$=s=>document.querySelectorAll(s)

const debounce=(fn,d=300)=>{
let t
return(...a)=>{
clearTimeout(t)
t=setTimeout(()=>fn(...a),d)
}
}

const esc=s=>(s||"").replace(/[&<>"']/g,m=>({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#039;"
}[m]))

const slug=s=>(s||"").toLowerCase().trim()

const normalize=s=>slug(s).replace(/\s+/g," ")

const parseCSV=t=>{
const r=[],l=t.trim().split("\n")
const h=l.shift().split(",").map(v=>v.trim())
for(const line of l){
const a=[]
let c="",q=!1
for(let i=0;i<line.length;i++){
const ch=line[i]
if(ch=='"'){
if(q&&line[i+1]=='"'){c+='"';i++}
else q=!q
}else if(ch==","&&!q){
a.push(c.trim())
c=""
}else c+=ch
}
a.push(c.trim())
const o={}
h.forEach((k,i)=>o[k]=a[i]||"")
r.push(o)
}
return r
}

const fmtPhone=p=>(p||"").replace(/\D/g,"")

const waLink=p=>`https://wa.me/91${fmtPhone(p)}`
const telLink=p=>`tel:${fmtPhone(p)}`

const uid=()=>Math.random().toString(36).slice(2,10)

const toast=m=>{
const t=document.createElement("div")
t.className="toast"
t.textContent=m
document.body.appendChild(t)
setTimeout(()=>t.classList.add("show"),50)
setTimeout(()=>{
t.classList.remove("show")
setTimeout(()=>t.remove(),300)
},2200)
}

const save=k,v=>localStorage.setItem(k,JSON.stringify(v))
const load=(k,d=null)=>{
try{
return JSON.parse(localStorage.getItem(k))??d
}catch{
return d
}
}

const fuzzy=(q,s)=>{
q=normalize(q)
s=normalize(s)
if(!q)return 1
if(s.includes(q))return 100
const qt=q.split(" ")
let sc=0
qt.forEach(t=>{
if(s.includes(t))sc+=10
})
return sc
}

const sharePNG=async(el,name)=>{
if(!window.html2canvas)return toast("Share unavailable")
const c=await html2canvas(el,{scale:2,useCORS:1})
c.toBlob(async b=>{
const f=new File([b],`${name}.png`,{type:"image/png"})
if(navigator.canShare?.({files:[f]})){
await navigator.share({files:[f],title:name})
}else{
const a=document.createElement("a")
a.href=URL.createObjectURL(b)
a.download=`${name}.png`
a.click()
}
})
}

const autoLink=t=>(t||"").replace(
/(https?:\/\/[^\s]+)/g,
u=>`<a href="${u}" target="_blank">${u}</a>`
)
