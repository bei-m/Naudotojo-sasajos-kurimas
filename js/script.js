let start=false;
//funkcija, kuri sumaiso paveiksliukus
function randomizer()
{
  //sumaisomi paveiksliukai
  let randomNumInRange;
  let pavs = ["pav1.jpeg", "pav2.jpeg", "pav3.jpeg", "pav4.jpeg", "pav5.jpeg", "pav6.jpeg", "pav7.jpeg", "pav8.jpeg", "pav9.jpeg", "pav10.jpeg"];
  let indexes = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8", "img9", "img10", "img11", "img12", "img13", "img14", "img15", "img16", "img17", "img18", "img19", "img20"];
  for (let i=0; i<10; i++)
  {
    let get;
    for (let j=0; j<2; j++)
    {
      const min = 0;
      const max = indexes.length-1;
      
      randomNumInRange = Math.floor(Math.random() * (max - min + 1)) + min;
      get = indexes[randomNumInRange];
      indexes.splice(randomNumInRange, 1);
      document.getElementById(`${get}`).src=pavs[i];
    }
  }

 // pradinis timeout, tarp randomize ir show
  setTimeout(() => {
  for (let i = 0; i < 20; i++) 
  { document.getElementById(`img${i + 1}`).style.display = 'block';}

  setTimeout(() => {
    for (let i = 0; i < 20; i++) 
    { document.getElementById(`img${i + 1}`).style.display = 'none';}
  }, 1000);
  }, 600); 

  setTimeout(()=>{start=true;}, 1300)
} 

let vardas = "";
//tikrinama, ar zaidejas ivede varda
const a = document.getElementById('zaisti');
const b = document.getElementById('intro');
const c = document.getElementById('game');
const d  = document.getElementById('pabaiga');
a.addEventListener('click', function () {
  vardas = document.getElementById('name').value;
  let f = document.getElementById('name');
  if (vardas=="") {vardas="GuestPlayer";}
  b.style.display="none";
  c.style.display="block";          
  f.style.borderColor="#394d35";
  randomizer();
  
});

let eile=[];
let moves = 0;
let atversti = 0;
let taskai = 50;
let minus=20;
let plius=50;
let points = document.getElementById("taskai");
let ejimai = document.getElementById("ejimai");
document.querySelectorAll('.grid-item').forEach(card => {
  card.addEventListener('click', () => {
    if (!start) {return;}
    if (moves>40) {minus=20; plius=30;}
    const id1 = card.getAttribute("id");
    const id2 = card.querySelector("img").getAttribute("id");
    const status = card.getAttribute("data-status");

    if (eile.length==0&&status==null) {eile.push({id1, id2}); return;}
    if (eile.length==1)
    {
      if (eile[0].id1==id1||status!=null) {return;}
      eile.push({id1, id2});
      let kortele1 = document.getElementById(`${eile[0].id2}`);
      let kortele2 = document.getElementById(`${eile[1].id2}`);

      kortele1.style.display="block";
      kortele2.style.display="block";
      setTimeout(() => {
        kortele1.style.display="none";
        kortele2.style.display="none";
      }, 500);

      if (kortele1.src==kortele2.src) 
      {
        let item1 = document.getElementById(`${eile[0].id1}`);
        let item2 = document.getElementById(`${eile[1].id1}`);
        item1.style.backgroundColor="#a3c79b";
        item2.style.backgroundColor="#a3c79b";
        item1.dataset.status="flipped";
        item2.dataset.status="flipped";
        atversti+=2;
        taskai+=plius;
      }
      else {taskai-=minus;}
      if (taskai<0) {taskai=0;}
      points.textContent=taskai;
      moves++;
      ejimai.textContent=moves;
      eile=[];

      if (atversti==20)
      {
        const a = document.getElementById("game");
        const b = document.getElementById("pabaiga");
        a.style.display="none";
        b.style.display="block";
        let points2 = document.getElementById("points");
        points2.textContent=taskai;

        let storedData = sessionStorage.getItem('gameResults');
        let zaidejai = storedData ? JSON.parse(storedData) : [];

        // ieskoma, ar jau toks zaidejas yra
        let atnaujinti = zaidejai.find(player => player.name === vardas);
        if (atnaujinti) 
        { 
            if (taskai>atnaujinti.score)
            {
              atnaujinti.score = taskai;
              atnaujinti.moves = moves;
            }
        }
        else 
        {
          let zaidejas = {name: vardas, score: taskai, moves: moves};
          zaidejai.push(zaidejas);
        }
        zaidejai.sort((a, b) => {
          if (b.score !== a.score) {return b.score - a.score;} //pirmiausia tikrinama, kuris turi daugiau tasku
          else {return a.moves - b.moves;} //jei turi vienodai tasku, tada tikrinama, kuris maziau padare maziau ejimu
        });
        
        sessionStorage.setItem('gameResults', JSON.stringify(zaidejai));

        let tableBody = document.getElementById('results');
        tableBody.innerHTML = ''; //visa lentele isclearinama

        zaidejai.forEach((player, index) => {
            let row = tableBody.insertRow(); // sukuriama nauja eilute

            // Iinsertinami langeliai
            let cell1 = row.insertCell(0); // Vieta
            let cell2 = row.insertCell(1); // Žaidėjas
            let cell3 = row.insertCell(2); // Taškai
            let cell4 = row.insertCell(3); // Ėjimai

            cell1.textContent = index + 1; 
            cell2.textContent = player.name; 
            cell3.textContent = player.score;
            cell4.textContent = player.moves; 
        });
      
      }
    }
  });
});

e = document.getElementById("restart");
e.addEventListener('click', function (){
  d.style.display="none";
  c.style.display="grid";
  eile=[];
  moves = 0;
  atversti = 0;
  taskai = 50;
  minus=20;
  plius=50; 

  document.querySelectorAll(".grid-item").forEach(item => {
    item.style.backgroundColor="#4c6646";
    item.removeAttribute("data-status");
  });
  points.textContent=taskai;
  ejimai.textContent=moves;
  randomizer();
});

f = document.getElementById("new");
f.addEventListener('click', function (){
  d.style.display="none";
  b.style.display="flex";
  eile=[];
  moves = 0;
  atversti = 0;
  taskai = 50;
  minus=20;
  plius=50; 

  document.querySelectorAll(".grid-item").forEach(item => {
    item.style.backgroundColor="#4c6646";
    item.removeAttribute("data-status");
  });
  points.textContent=taskai;
  ejimai.textContent=moves;
  document.getElementById('name').value="";
  randomizer();
});

let on = false;
const g = document.getElementById('rules');
g.addEventListener('click', function () {
  const rules = document.getElementById('taisykles');
  on = !on;
  if (on) {rules.style.display="block";}
  else {rules.style.display="none";}
})


  