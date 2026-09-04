
(function(){
  const defaults={
    ninjaName:"Shinobi",
    village:"Frunza",
    clan:"Independent",
    rank:"Student",
    xp:0,
    coins:150,
    streak:1,
    quizCorrect:0,
    quizAnswered:0,
    missionsDone:0
  };

  function getProfile(){
    let data={};
    try{data=JSON.parse(localStorage.getItem("ninjaProfile")||"{}")}catch(e){}
    return Object.assign({},defaults,data||{});
  }

  function saveProfile(p){
    localStorage.setItem("ninjaProfile",JSON.stringify(Object.assign({},defaults,p)));
    window.dispatchEvent(new CustomEvent("ninja-profile-updated"));
  }

  function rankFromXP(xp){
    if(xp>=7000)return "Kage";
    if(xp>=3500)return "Jonin";
    if(xp>=1500)return "Chunin";
    if(xp>=500)return "Genin";
    return "Student";
  }

  function addXP(amount){
    const p=getProfile();
    p.xp=Math.max(0,Number(p.xp||0)+Number(amount||0));
    p.rank=rankFromXP(p.xp);
    saveProfile(p);
    return p;
  }

  function bindNav(){
    document.querySelectorAll("[data-page]").forEach(btn=>{
      btn.addEventListener("click",()=>{
        const page=btn.dataset.page;
        if(page) location.href="./"+page;
      });
    });
  }

  let deferredPrompt=null;
  window.addEventListener("beforeinstallprompt",e=>{
    e.preventDefault();
    deferredPrompt=e;
    document.querySelectorAll("[data-install]").forEach(b=>b.hidden=false);
  });

  async function installApp(){
    if(deferredPrompt){
      deferredPrompt.prompt();
      await deferredPrompt.userChoice.catch(()=>null);
      deferredPrompt=null;
      return;
    }
    alert("iPhone: Partajare → Adaugă pe ecranul principal. Android/Chrome: meniul browserului → Instalează aplicația.");
  }

  document.addEventListener("DOMContentLoaded",()=>{
    bindNav();
    document.querySelectorAll("[data-install]").forEach(btn=>{
      btn.addEventListener("click",installApp);
    });
    if("serviceWorker" in navigator){
      navigator.serviceWorker.register("./service-worker.js?v=15",{scope:"./",updateViaCache:"none"}).catch(console.warn);
    }
  });

  window.NinjaApp={getProfile,saveProfile,addXP,rankFromXP};
})();
