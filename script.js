const CARDS = [
  {id:1,title:"Unser erstes Treffen",rarity:"EPIC",text:"Deine meerblauen Augen werden für immer meine Liebsten sein.",image:"images/photo01.jpeg"},
  {id:2,title:"Strahlender Himmel bei Nacht",rarity:"LEGENDARY",text:"Ein Komet nur für dich und mich.",image:"images/photo02.jpeg"},
  {id:3,title:"Am Bahnhof",rarity:"RARE",text:"Ein simpler Moment war so besonders für mich.",image:"images/photo03.jpeg"},
  {id:4,title:"Ich liebe dich",rarity:"SPECIAL",text:"Ich liebe dich, nach ca. 2 Wochen zu sagen ist schon krass hihi.",image:"images/photo04.jpeg"},
  {id:5,title:"Alles Nass",rarity:"EPIC",text:"Der Kuss im Regen lässt mein Herz schneller schlagen.",image:"images/photo05.jpeg"},
  {id:6,title:"Songs",rarity:"LEGENDARY",text:"Rollercoaster Girl — ein Lied, das jetzt zu uns gehört.",image:"images/photo06.jpeg",song:true},
  {id:7,title:"Marry Me",rarity:"LEGENDARY",text:"Lass mich nicht so lange warten.",image:"images/photo07.jpeg"},
  {id:8,title:"Kiss Me",rarity:"LEGENDARY",text:"Mein erster Kuss überhaupt, wie aus dem Märchenbuch.",image:"images/photo08.jpeg"},
  {id:9,title:"Gutschein",rarity:"RARE",text:"Ich koche für dich. Einlösbar: einmal.",image:"images/photo09.jpeg"},
  {id:10,title:"Unsere Lieblingsnummer 13",rarity:"SPECIAL",text:"13. Mehr muss man dazu eigentlich nicht sagen.",image:"images/photo10.jpeg"},
  {id:11,title:"Gutschein",rarity:"COMMON",text:"Überraschung. Einlösbar: einmal.",image:"images/photo11.jpeg"},
  {id:12,title:"Insta Moment",rarity:"RARE",text:"Ganz romantisch auf dem Weg vom Müll zum Wohnwagen.",image:"images/photo12.jpeg"},
  {id:13,title:"First Massage",rarity:"SPECIAL",text:"Hier is so ein fucking smasher Typ.",image:"images/photo13.jpeg"},
  {id:14,title:"First Pic",rarity:"EPIC",text:"Da wussten wir noch nicht, was WIR sind.",image:"images/photo01.jpeg"},
  {id:15,title:"Gutschein",rarity:"COMMON",text:"Baking Wish. Einlösbar: dreimal.",image:"images/photo02.jpeg"},
  {id:16,title:"Charakter Karte — Imal",rarity:"LEGENDARY",text:"Humor 10/10 · Fürsorge 10/10 · Snack Geschmack 6/10 · Besonderheit 13/10",image:"images/photo03.jpeg"},
  {id:17,title:"Charakter Karte — Emy",rarity:"LEGENDARY",text:"Fürsorge 10/10 · Ordnung 3/10 · Snack Geschmack 10/10 · Besonderheit 13/10",image:"images/photo04.jpeg"},
  {id:18,title:"Team Karte",rarity:"SPECIAL",text:"Zusammenhalt 10/10 · Vertrauen 10/10 · Gemeinsame Energie 5/10 · Snack Kompatibilität 4/10 · Teamlevel 13",image:"images/photo05.jpeg"},
  {id:19,title:"Reminder",rarity:"RARE",text:"Du warst schon am Anfang unserer Beziehung so wie jetzt. Du erinnerst mich so an dich selber. Lies mal unsere ersten paar Nachrichten.",image:"images/photo06.jpeg"},
  {id:20,title:"Final Special End",rarity:"LEGENDARY",text:"Danke Emil. Danke für dein Licht, Lachen und Lächeln. Danke für diese wunderschöne Gelbe Welt.",image:"images/photo07.jpeg"},
];

const START_DATE = "2026-09-29";
const STORAGE_KEY = "ourLittleCollection_v1";
const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"collected":[]}');

const homeView = document.getElementById("homeView");
const albumView = document.getElementById("albumView");
const albumGrid = document.getElementById("albumGrid");
const albumCount = document.getElementById("albumCount");
const headerCount = document.getElementById("headerCount");
const progressFill = document.getElementById("progressFill");
const packNumber = document.getElementById("packNumber");
const todayText = document.getElementById("todayText");
const lockedMessage = document.getElementById("lockedMessage");
const modal = document.getElementById("cardModal");
const detailModal = document.getElementById("detailModal");
const tearPack = document.getElementById("tearPack");
const cardReveal = document.getElementById("cardReveal");
const cardScene = document.getElementById("cardScene");
const revealActions = document.getElementById("revealActions");
const addToAlbum = document.getElementById("addToAlbum");

function dateIndex() {
  const start = new Date(START_DATE + "T00:00:00");
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((today - start) / 86400000) + 1;
}
function availableCount() {
  return Math.max(0, Math.min(CARDS.length, dateIndex()));
}
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function artClass(card){
  if(card.image) return "";
  return `art-${card.art || "night"}`;
}
function cardHTML(card, small=false){
  const rarity = card.rarity.toLowerCase();
  const holo = ["legendary","epic"].includes(rarity) ? " holo" : "";
  const image = card.image ? `<img src="${card.image}" alt="" style="width:100%;height:100%;object-fit:cover">` : "";
  const extra = card.song ? `<div style="position:absolute;inset:auto 12px 12px 12px;background:rgba(0,0,0,.58);color:#fff;padding:8px;border-radius:7px;font-size:7px;letter-spacing:1px">ROLLERCOASTER GIRL</div>` : "";
  return `<div class="card" data-id="${card.id}">
    <div class="face front rarity-${rarity}${holo}">
      <div class="card-rarity">${card.rarity}</div>
      <div class="card-no">#${String(card.id).padStart(2,"0")}</div>
      <div class="card-image ${artClass(card)}">${image}${extra}</div>
      <div class="card-title">${card.title}</div>
      <div class="card-text">${card.text}</div>
    </div>
    <div class="face back">
      <div class="back-inner"><div><strong>OUR LITTLE<br>COLLECTION</strong><br><br><small>IM × KNOPFPRINZESSIN</small></div></div>
    </div>
  </div>`;
}

function render(){
  const available = availableCount();
  const collected = state.collected.length;
  packNumber.textContent = `#${String(Math.min(available || 1,20)).padStart(3,"0")}`;
  todayText.textContent = available ? `Heute wartet Karte #${String(available).padStart(2,"0")} auf dich.` : "Die Sammlung beginnt am 29. September 2026.";
  albumCount.textContent = collected;
  headerCount.textContent = `${collected} / 20`;
  progressFill.style.width = `${collected/20*100}%`;
  lockedMessage.classList.add("hidden");

  albumGrid.innerHTML = CARDS.map(card=>{
    const isAvailable = card.id <= available;
    const isCollected = state.collected.includes(card.id);
    if(!isAvailable){
      return `<div class="album-slot locked"><div class="slot-inner">#${String(card.id).padStart(2,"0")}</div></div>`;
    }
    if(!isCollected){
      return `<div class="album-slot locked"><div class="slot-inner">?</div></div>`;
    }
    return `<div class="album-slot" data-card="${card.id}"><div class="slot-card">${cardHTML(card,true)}</div></div>`;
  }).join("");

  albumGrid.querySelectorAll("[data-card]").forEach(el=>{
    el.addEventListener("click",()=>openDetail(Number(el.dataset.card)));
  });
}

function showAlbum(){
  homeView.classList.add("hidden"); albumView.classList.remove("hidden"); render();
}
function showHome(){ albumView.classList.add("hidden"); homeView.classList.remove("hidden"); }

function openPack(){
  const available = availableCount();
  const next = Math.min(available,20);
  if(!next){
    lockedMessage.textContent = "Noch ist keine Karte freigeschaltet.";
    lockedMessage.classList.remove("hidden"); return;
  }
  if(state.collected.includes(next)){
    showAlbum(); return;
  }
  const card = CARDS[next-1];
  modal.classList.remove("hidden"); modal.setAttribute("aria-hidden","false");
  tearPack.classList.remove("opened"); tearPack.style.display="flex";
  cardReveal.classList.remove("show"); revealActions.classList.add("hidden");
  cardScene.innerHTML = cardHTML(card);
  setTimeout(()=> {
    tearPack.animate([{transform:"rotate(-2deg) scale(1)"},{transform:"rotate(2deg) scale(1.06)"},{transform:"rotate(-2deg) scale(.9)",opacity:1},{transform:"rotate(-5deg) translateY(-30px) scale(.75)",opacity:0}],{duration:900,easing:"cubic-bezier(.2,.8,.2,1)"});
  },300);
  setTimeout(()=>{
    tearPack.style.display="none";
    cardReveal.classList.add("show");
    revealActions.classList.remove("hidden");
  },1100);
}
function closeModal(){modal.classList.add("hidden");modal.setAttribute("aria-hidden","true")}
function openDetail(id){
  const card=CARDS.find(c=>c.id===id); if(!card) return;
  detailModal.classList.remove("hidden"); detailModal.setAttribute("aria-hidden","false");
  document.getElementById("detailCardWrap").innerHTML=cardHTML(card);
  document.getElementById("detailCardWrap").querySelector(".card").addEventListener("click",e=>e.currentTarget.classList.toggle("flipped"));
}
function closeDetail(){detailModal.classList.add("hidden");detailModal.setAttribute("aria-hidden","true")}

document.getElementById("openPack").addEventListener("click",openPack);
document.getElementById("albumBtn").addEventListener("click",showAlbum);
document.getElementById("albumBtn2").addEventListener("click",showAlbum);
document.getElementById("backBtn").addEventListener("click",showHome);
document.getElementById("closeModal").addEventListener("click",closeModal);
document.getElementById("closeDetail").addEventListener("click",closeDetail);
document.querySelector("#cardModal .modal-backdrop").addEventListener("click",closeModal);
document.querySelector("#detailModal .modal-backdrop").addEventListener("click",closeDetail);

addToAlbum.addEventListener("click",()=>{
  const available=availableCount();
  if(!state.collected.includes(available)){
    state.collected.push(available); state.collected.sort((a,b)=>a-b); save();
  }
  closeModal(); render();
  setTimeout(showAlbum,150);
});

render();
