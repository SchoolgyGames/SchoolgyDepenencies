const container = document.getElementById("container");
const viewer = document.getElementById("zoneViewer");
const frame = document.getElementById("zoneFrame");
const search = document.getElementById("searchBar");
const zoneName = document.getElementById("zoneName");

const zonesURL = "https://cdn.jsdelivr.net/gh/gn-math/assets@main/zones.json";
const coverURL = "https://cdn.jsdelivr.net/gh/gn-math/covers@main";
const htmlURL  = "https://cdn.jsdelivr.net/gh/gn-math/html@main";

let zones = [];

fetch(zonesURL)
.then(r=>r.json())
.then(data=>{
  zones = data;
  render(zones);
});

function render(list){
container.innerHTML="";
list.forEach(z=>{
  const d=document.createElement("div");
  d.className="zone-item";
  d.onclick=()=>openZone(z);

  const i=document.createElement("img");
  i.src=z.cover.replace("{COVER_URL}",coverURL);
  d.appendChild(i);

  const b=document.createElement("button");
  b.textContent=z.name;
  d.appendChild(b);

  container.appendChild(d);
});
}

search.oninput=()=>{
const q=search.value.toLowerCase();
render(zones.filter(z=>z.name.toLowerCase().includes(q)));
};

function openZone(z){
fetch(z.url.replace("{HTML_URL}",htmlURL))
.then(r=>r.text())
.then(html=>{
  frame.srcdoc=html;
  zoneName.textContent=z.name;
  viewer.style.display="flex";
});
}

document.getElementById("closeBtn").onclick=()=>{
viewer.style.display="none";
frame.srcdoc="";
};

document.getElementById("fullscreenBtn").onclick=()=>{
frame.requestFullscreen();
};

document.getElementById("blankBtn").onclick=()=>{
const w=open("about:blank");
w.document.write(frame.srcdoc);
};
