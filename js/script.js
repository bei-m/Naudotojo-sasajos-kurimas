//objektas, i kuri bus saugomi duomenys
const naudotojas={ 
  lytis:"-", vardas:"-", antrasis_vardas:"-", pavarde:"-", gimimo_data:"-", 
  asmens_kodas:"-", tel_nr:"-", el_pastas:"-", adresas:"-",

  issilavinimas:"-", p_mokslo_istaiga:"-", uzbaigimo_metai:"-", 
  kvalifikacija:"-", mokslo_laipsnis:"-",

  vedybine_padetis:"-", sutuoktinis:"-",

  profesine_padetis:"-",

  stud_pakopa:"-", kursas:"-", studiju_istaiga:"-", baigimo_m:"-",

  darbo_istaiga:"-", pareigos:"-", darbo_patirtis:"-", darbo_sritis:"-",

  nedarbo_priezastis:"-",
  atostogu_pabaiga:"-"
}

const x = document.getElementById("code");
//sudaromas asmens kodas is gimimo datos ir lyties
function a_kodo_sudarymas (gd_y, gd_m, gd_d, g) {
  naudotojas.gimimo_data=gd_y+" "+gd_m+" "+gd_d;
  let ak = ""
  if (g=="Moteris")
  {
    if (gd_y>=1901 && gd_y<2001) {ak+="4"}
    else if (gd_y>=2001 && gd_y<=2023) {ak+="6"}
  }
  else if (g=="Vyras")
  {
    if (gd_y>=1901 && gd_y<2001) {ak+="3"}
    else if (gd_y>=2001 && gd_y<=2023) {ak+="5"}
  }
    gd_y = gd_y.substring(2);
    ak+=gd_y+gd_m+gd_d
    x.value=ak;
}

//jei visi reikiami laukai uzpildyti, sudaromas asmens kodas
function eventai () {
  const a = document.getElementById("bday_y");
  const b = document.getElementById("bday_m");
  const c = document.getElementById("bday_d");
  const d = document.getElementById("gender");

  if (a.value.length==4 && b.value.length==2 && c.value.length==2 && d.value!="") {a_kodo_sudarymas(a.value,b.value,c.value, d.value);}
}

//jei lytis, gim metai, menuo ar diena pakeiciami, is karto reaguoja event listeners ir keiciamas asmens kodas
const a = document.getElementById("bday_y");
const b = document.getElementById("bday_m");
const c = document.getElementById("bday_d");
const d = document.getElementById("gender");
a.addEventListener("input", eventai);
b.addEventListener("input", eventai);
c.addEventListener("input", eventai);
d.addEventListener("input", eventai);

//mygtuku "Kitas" ir "Ankstenis" funkcija
function pereiti (dabartinis, kitas) {
  const a = document.getElementById(`${dabartinis}`);
  const b = document.getElementById(`${kitas}`);

  a.style.display="none";
  b.style.display="block";
}

//error ijungimo funkcija
function er (laukas, klaida, tekstas) {
  let a = document.getElementById(`${laukas}`); //laukas, kuriame klaida
  let b = document.getElementById(`${klaida}`); //error, kuri turi trigerint
  
  a.style.borderColor="red";
  b.textContent=tekstas;
  b.style.display="block";
}

//error isjungimo funkcija
function off(laukas, klaida)
{
  let a = document.getElementById(`${laukas}`);
  let b = document.getElementById(`${klaida}`);

  a.style.borderColor="#2a3a28";
  b.style.display="none";
}

//funkcija, kuriai perduodama tikrinti visus ivesties laukus
function lauku_tikrinimas(fields) {
  let status = true;

  fields.forEach(({ field, error, condition, message }) => 
  {
    if (condition) {er(field, error, message); status=false;} 
    else {off(field, error);}
  });

  return status;
}


const default_m = "Neužpildėte būtinų laukų"

//datos tikrinimo funckija
function date(laukas_y, laukas_m, laukas_d, error) {
  let a = document.getElementById(`${laukas_y}`);
  let b = document.getElementById(`${laukas_m}`);
  let c = document.getElementById(`${laukas_d}`);

  //true - error isjungtas, false - ijungtas
  let status = true;

  if (a.value=="") {er(laukas_y, error, default_m); status=false;}
  else if (a.value.length!=4||a.value<1901||!tiknr(a.value)) {er(laukas_y, error, "Įvedėte netinkamą datą"); status=false;}
  else {a.style.borderColor="#2a3a28"}

  if (b.value=="") {er(laukas_m, error, default_m); status=false;}
  else if (b.value.length!=2||b.value<1||b.value>12||!tiknr(b.value)) {er(laukas_m, error, "Įvedėte netinkamą datą"); status=false;}
  else {b.style.borderColor="#2a3a28"}

  if (c.value=="") {er(laukas_d, error, default_m); status=false;}
  else if (c.value.length!=2||c.value<1||c.value>31||!tiknr(c.value)) {er(laukas_d, error, "Įvedėte netinkamą datą"); status=false;}
  else if (status) {off(laukas_d, error); status=true;}
  else {c.style.borderColor="#2a3a28"}

  return status;
}

//funkcija, kuria reguliuojamas progreso rodymas
function prog(laukas, nr) {
  const squares = document.querySelectorAll(".b2");
  if (nr==0) {squares[laukas-1].style.backgroundColor="#d3d3de";}
  else {squares[laukas-1].style.backgroundColor=" #2f2f62";}
}

//funkcija, kuria tikrinama, ar ivestis tik skaiciai
function tiknr(input) {
  const regex = /^[0-9]+$/;
  return regex.test(input);
}

//amziaus skaiciavimo funkcija
function amzius(gimimo_data) {
  const birth_date = new Date(gimimo_data);
  const siandien = new Date();

  let age = siandien.getFullYear()-birth_date.getFullYear();
  const men_sk = siandien.getMonth()-birth_date.getMonth();

  if (men_sk<0||(men_sk==0 && siandien.getDate()<birth_date.getDate())) {age--;}
  return age;
}

//pirmojo puslapio informacijos tikrinimas ir irasymas
const e = document.getElementById("k1");
e.addEventListener("click", function () {
  let a = document.getElementById("gender").value;
  let b = document.getElementById("name").value;
  let c = document.getElementById("l_name").value;
  let d = document.getElementById("bday_y").value;
  let e = document.getElementById("bday_m").value;
  let f = document.getElementById("bday_d").value;
  let g = document.getElementById("code").value;
  let h = document.getElementById("nr").value;
  let i = document.getElementById("email").value;
  let k = document.getElementById("address").value;
  let j = document.getElementById("name2").value;
  
  const fields = [
    {field: "gender", error: "error1", condition: a=="", message: default_m },
    {field: "name", error: "error2", condition: b=="", message: default_m },
    {field: "l_name", error: "error3", condition: c=="", message: default_m },
    {field: "code", error: "error5", condition: g=="" || g.length!=11 || !tiknr(g), message: g=="" ? default_m: "Įveskite tinkamą asmens kodą"},
    {field: "nr", error: "error6", condition: h=="" || h.length!=12 || !tiknr(h.slice(1)) || h[0]!="+", message: h=="" ? default_m : "Įveskite tinkamą telefono numerį"},
    {field: "email", error: "error7", condition: i=="" || !i.includes("@"), message: i=="" ? default_m : "Įveskite tinkamą el. pašto adresą"},
    {field: "address", error: "error8", condition: k=="", message: default_m }
  ];

 //patikrinama, ar visi duomenys teisingai irasyti
  let status_1 = lauku_tikrinimas(fields);
  let status_2 = date("bday_y", "bday_m", "bday_d", "error4");
  let status = status_1 && status_2;
  
  //status true, kai visi duomenys teisingi
  if (status)
  {
    //informacijos irasymas
    naudotojas.lytis=a;
    naudotojas.vardas=b;
    naudotojas.pavarde=c;
    naudotojas.gimimo_data=d+" "+e+" "+f;
    naudotojas.asmens_kodas=g;
    naudotojas.tel_nr=h;
    naudotojas.el_pastas=i;
    naudotojas.adresas=k;
    naudotojas.antrasis_vardas=j;

    //perejimas is pirmo i antra psl
    const age = amzius(naudotojas.gimimo_data);
    const squares = document.querySelectorAll(".b2");
    // jei mazius maziau 16, rodoma, kad pildomi 3, o ne 4 lapai (be vedybines padeties)
    if (age<16) {squares[2].style.display="none";}
    else {squares[2].style.display="flex";}
    pereiti("b_info", "issilavinimas");
    prog(2,1);
  }
});

//grizimas is antro psl i pirma
const f = document.getElementById("a2");
f.addEventListener("click", function () {
  pereiti("issilavinimas", "b_info"); prog (2,0);});

//nuo issilavinimo tipo priklauso, kokie laukai rodomi
const g = document.getElementById("education");
g.addEventListener("input", function () {
  const a = document.getElementById("aukst");
  if (g.value=="Aukštasis-kolegijinis" || g.value=="Aukštasis-universitetinis")
  {
    let b = document.getElementById("ed_laipsnis");
    //jei issilavinimas kolegijinis, mokslo laipsnis nustatomas automatiskai
    if (g.value=="Aukštasis-kolegijinis")
    {
      a.style.display="block";
      b.value="Profesinis bakalauras";
      b.style.display="inline-block";
      b.disabled=true;
      off("ed_laipsnis", "error14");
    }
    else
    {
      a.style.display="block";
      b.value="";
      b.disabled=false;
    }
  }
  else {a.style.display="none";}
});

//antrojo puslapio informacijos tikrinimas ir irasymas
const h = document.getElementById("k2");
h.addEventListener("click", function (){
  let a = document.getElementById("education").value;
  let b = document.getElementById("ed2").value;
  let c = document.getElementById("ed_y").value;
  let d = document.getElementById("kval").value;
  let e = document.getElementById("ed_laipsnis").value;

  //informscijos tikrinimas
  const fields = [
    {field: "education", error: "error10", condition: a=="", message: default_m },
    {field: "ed2", error: "error11", condition: b=="", message:default_m},
    {field: "ed_y", error: "error12", condition: c==""||!tiknr(c)|| c.length!=4, message: c==""? default_m: "Įveskite tinkamus metus"},
    {field: "kval", error: "error13", condition: (a=="Aukštasis-kolegijinis" || a=="Aukštasis-universitetinis") && d=="", message: default_m},
    {field: "ed_laipsnis", error: "error14", condition: (a=="Aukštasis-kolegijinis" || a=="Aukštasis-universitetinis") && e=="", message: default_m}
  ];
  
  //patikrinama, ar visi duomenys teisingai irasyti
  let status = lauku_tikrinimas(fields);

  if (status)
  {
    //informacijos irasymas
    naudotojas.issilavinimas=a;
    naudotojas.p_mokslo_istaiga=b;
    naudotojas.uzbaigimo_metai=c;
    if (a=="Aukštasis-kolegijinis" || a=="Aukštasis-universitetinis") {naudotojas.kvalifikacija=d; naudotojas.mokslo_laipsnis=e;}
    else {naudotojas.kvalifikacija="-"; naudotojas.mokslo_laipsnis="-";}
    let age = amzius(naudotojas.gimimo_data);
    //jei mazius 16 ir daugiau - perkelia i vedybine padeti, jei ne - i profesine padeti
    if (age>=16) {pereiti("issilavinimas", "vedyb"); prog(3,1);}
    else {pereiti("issilavinimas", "prof_pad"); prog(4,1);}
  }
});


//jei vedes, prasoma sutuoktinio duomenu
const i = document.getElementById("wed");
i.addEventListener ("input", function() {
  const a = document.getElementById("sso");
    if (i.value=="Vedęs/Ištekėjusi") {a.style.display="block";}
    else  {a.style.display="none";}
});

//grizimas is trecio puslapio i antra
const j = document.getElementById("a3");
j.addEventListener("click", function () {pereiti("vedyb", "issilavinimas"); prog(3,0);});

//trecio puslapio informacijos tikrinimas ir irasymas
const l = document.getElementById("k3");
l.addEventListener("click", function () {
  let a = document.getElementById("wed").value;
  let b = document.getElementById("so_v").value;
  let c = document.getElementById("so_p").value;

  //informscijos tikrinimas
  const fields = [
    {field: "wed", error: "error15", condition: a=="", message: default_m},
    {field: "so_v", error: "error16", condition: a=="Vedęs/Ištekėjusi" && b=="", message: default_m},
    {field: "so_p", error: "error17", condition: a=="Vedęs/Ištekėjusi" && c=="", message: default_m},
  ];
  
  //patikrinama, ar visi duomenys teisingai irasyti
  let status = lauku_tikrinimas(fields);
  
  if (status)
  {
    //informacijos irasymas
    naudotojas.vedybine_padetis=a;
    if (a=="Vedęs/Ištekėjusi") {naudotojas.sutuoktinis=b+" "+c;}
    else {naudotojas.sutuoktinis="-";}
    //perejimas i kita psl
    pereiti("vedyb", "prof_pad");
    prog(4, 1);
  }
});

//nuo profesines padeties priklauso kokie laukai bus rodomi
const k = document.getElementById("pp");
k.addEventListener("input", function () {
  const a = document.getElementById("apie_studijas");
  const b = document.getElementById("apie_darba");
  const c = document.getElementById("apie_nedarba");
  const d = document.getElementById("apie_at");
  if (k.value=="Studijuoju ir nedirbu") 
  {
    a.style.display="block";
    b.style.display="none";
    c.style.display="none";
    d.style.display="none";
  }
  else if (k.value=="Studijuoju ir dirbu") 
  {
    a.style.display="block";
    b.style.display="block";
    c.style.display="none";
    d.style.display="none";
  }
  else if (k.value=="Dirbu") 
  {
    a.style.display="none";
    b.style.display="block";
    c.style.display="none";
    d.style.display="none";
  }
  else if (k.value=="Nedirbu") 
  {
    a.style.display="none";
    b.style.display="none";
    c.style.display="block";
    d.style.display="none";
  }
  else if (k.value=="Motinystės/tėvystės atostogose") 
  {
    a.style.display="none";
    b.style.display="none";
    c.style.display="none";
    d.style.display="block";
  }
});

//grizimas is ketvirto i trecia psl
const m = document.getElementById("a4");
m.addEventListener("click", function () {
  let age = amzius(naudotojas.gimimo_data);
  if (age>=16) {pereiti("prof_pad", "vedyb");}
  else {pereiti ("prof_pad", "issilavinimas");}
  prog(4,0);
});

//ketvirto puslapio informacijos tikrinimas ir irasymas
const n = document.getElementById("k4");
n.addEventListener("click", function () {
  let a = document.getElementById("pp").value;
  let b, c, d, e, f, g, h, i;
  let status;

  //informacijos tikrinimas
  const fields = [
    {field: "pp", error: "error18", condition: a=="", message: default_m},
  ];
  
  lauku_tikrinimas(fields);
  if (a=="Studijuoju ir dirbu" || a=="Studijuoju ir nedirbu")
  {
    b = document.getElementById("stud_p").value;
    c = document.getElementById("kursas").value;
    d = document.getElementById("s_istaiga").value;
    e = document.getElementById("bm").value;
  
    fields.push(
      {field: "stud_p", error: "error19", condition: b=="", message: default_m},
      {field: "kursas", error: "error20", condition: c=="", message: default_m},
      {field: "s_istaiga", error: "error21", condition: d=="", message: default_m},
      {field: "bm", error: "error22", condition: e==""||!tiknr(e)||e.length!="4", message: e=="" ? default_m : "Įveskite tinkamus metus"});

    status = lauku_tikrinimas(fields); 
  }

  if (a=="Dirbu" || a=="Studijuoju ir dirbu")
  {
    f = document.getElementById("d_istaiga").value;
    g = document.getElementById("pareigos").value;
    h = document.getElementById("d_patirtis").value;
    i = document.getElementById("d_sritis").value;
  
    fields.push(
      {field: "d_istaiga", error: "error23", condition: f=="", message: default_m},
      {field: "pareigos", error: "error24", condition: g=="", message: default_m},
      {field: "d_patirtis", error: "error25", condition: h=="", message: default_m},
      {field: "d_sritis", error: "error26", condition: i=="", message: default_m});

    status = lauku_tikrinimas(fields); 
  }
  else if (a=="Nedirbu")
  {
    f = document.getElementById("nedarbas").value;

    fields.push({field: "nedarbas", error: "error27", condition: f=="", message: default_m});
    status = lauku_tikrinimas(fields); 
  }
  else if (a=="Motinystės/tėvystės atostogose")
  {
    f = document.getElementById("vac_y").value;
    g = document.getElementById("vac_m").value;
    h = document.getElementById("vac_d").value;

    let status_1 = lauku_tikrinimas(fields);
    let status_2 = date("vac_y", "vac_m", "vac_d", "error28"); 
    status = status_1 && status_2; 
  }

  if (status)
  {
    //informacijos irasymas
    naudotojas.profesine_padetis=a;
    if (a=="Studijuoju ir dirbu" || a=="Studijuoju ir nedirbu")
    {
      naudotojas.stud_pakopa=b;
      naudotojas.kursas=c;
      naudotojas.studiju_istaiga=d;
      naudotojas.baigimo_m=e;
    }
    if (a=="Dirbu" || a=="Studijuoju ir dirbu")
    {
      naudotojas.darbo_istaiga=f;
      naudotojas.pareigos=g;
      naudotojas.darbo_patirtis=h;
      naudotojas.darbo_sritis=i;
    }
    else if (a=="Nedirbu")
    {naudotojas.nedarbo_priezastis=f;}
    else if (a=="Motinystės/tėvystės atostogose")
    {naudotojas.atostogu_pabaiga=f+" "+g+" "+h;}
    //perejimas i kita psl
    const squares = document.querySelectorAll(".b2");
    squares.forEach(square => {
      square.style.display = "none";});
    pereiti("prof_pad", "zinute");
  
    console.log("Lytis: " + naudotojas.lytis);
    console.log("Vardas: "+ naudotojas.vardas);
    console.log("Antrasis vardas: " + naudotojas.antrasis_vardas);
    console.log("Pavardė: " + naudotojas.pavarde);
    console.log("Gimimo data: " + naudotojas.gimimo_data);
    console.log("Asmens kodas: " + naudotojas.asmens_kodas);
    console.log("Tel. nr.: " + naudotojas.tel_nr);
    console.log("El. pastas: "+naudotojas.el_pastas);
    console.log("Adresas: "+naudotojas.adresas);
    console.log("Išsilavinimas "+naudotojas.issilavinimas);
    console.log("Pask. mokslo įstaiga: "+naudotojas.p_mokslo_istaiga);
    console.log("Užbaigimo metai: "+naudotojas.uzbaigimo_metai);
    console.log("Kvalifikacija: "+naudotojas.kvalifikacija);
    console.log("Mokslo laipsnis: "+naudotojas.mokslo_laipsnis);
    console.log("Vedybinė padėtis: "+naudotojas.vedybine_padetis);
    console.log("Sutuoktinis: "+naudotojas.sutuoktinis);
    console.log("Profesinė padėtis; "+naudotojas.profesine_padetis);
    console.log("Studijų pakopa: "+naudotojas.stud_pakopa);
    console.log("Kursas: "+naudotojas.kursas);
    console.log("Studijų įstaiga: "+naudotojas.studiju_istaiga);
    console.log("Tikėtini baigimo metai: "+naudotojas.baigimo_m);
    console.log("Darbo įstaiga: "+naudotojas.darbo_istaiga);
    console.log("Pareigos: "+naudotojas.pareigos);
    console.log("Darbo patirtis: "+naudotojas.darbo_patirtis);
    console.log("Darbo sritis: "+naudotojas.darbo_sritis);
    console.log("Nedarbo priežastis: "+naudotojas.nedarbo_priezastis);
    console.log("Atostogų pabaiga: "+naudotojas.atostogu_pabaiga);
  }
});

