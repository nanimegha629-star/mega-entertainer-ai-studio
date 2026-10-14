const $=id=>document.getElementById(id);
async function api(path, options={}) {
  try { const r=await fetch(path,options); const data=await r.json(); return {ok:r.ok,data}; }
  catch(e){ return {ok:false,data:{error:"Backend is not available yet. Deploy the project to Vercel first."}}; }
}
function message(s){$("actionMessage").textContent=s;}
async function refresh(){
  $("status").textContent="Checking…";
  const result=await api("/api/status");
  if(!result.ok){$("status").textContent="Not connected";$("statusNote").textContent=result.data.error||"Deploy backend first.";return;}
  const d=result.data;
  $("status").textContent=d.status||"Unknown";
  $("statusNote").textContent=d.lastRun||"No production run recorded";
  $("sudheerVideos").textContent=d.counts?.sudheer?.videos??0;
  $("sudheerPosters").textContent=d.counts?.sudheer?.posters??0;
  $("ntrVideos").textContent=d.counts?.ntr?.videos??0;
  $("ntrPosters").textContent=d.counts?.ntr?.posters??0;
  if(d.steps){$("pipeline").innerHTML=d.steps.map((s,i)=>`<div class="pipeline-row"><span class="step">0${i+1}</span><div><b>${esc(s.name)}</b><small>${esc(s.detail)}</small></div><span class="state">${esc(s.status)}</span></div>`).join("");}
}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
window.showStar=async name=>{ $("dialogTitle").textContent=name+" — production details"; const r=await api("/api/status"); $("detailText").textContent=JSON.stringify(r.data,null,2);$("details").showModal();};
$("closeDialog").onclick=()=>$("details").close();
$("refreshBtn").onclick=refresh;
$("runBtn").onclick=async()=>{message("Checking configuration and starting a safe production check…");const r=await api("/api/run",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({source:"dashboard"})});message(r.data.message||r.data.error||"No response");await refresh();};
$("telegramBtn").onclick=async()=>{const r=await api("/api/status");message("Telegram: "+(r.data.integrations?.telegram||"Not configured")+" — add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel environment variables.");};
$("driveBtn").onclick=async()=>{const r=await api("/api/status");message("Google Drive: "+(r.data.integrations?.drive||"Not configured")+" — follow README setup instructions.");};
refresh();