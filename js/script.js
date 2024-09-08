function rodymas(reiksme) //skaiciu paspaudimas
{
    const screen = document.getElementById('screen');
    if (resultscreen.textContent == 'error' || resultscreen.textContent.includes('=')) {screen.textContent = ''; resultscreen.textContent = '';}
    
    if (!isNaN(reiksme))
    {
        let test = dalinimas(screen.textContent+reiksme);
        if (test[test.length-1]<=99999999) {screen.textContent += reiksme;}
    }
    else {screen.textContent += reiksme;}
}

function ac() //all clear paspaudimas
{
    const screen = document.getElementById('screen');
    screen.textContent = '';
    resultscreen.textContent = '';
}

function del () //del paspaudimas
{
    const screen = document.getElementById('screen');
    let tekstas = screen.textContent;
    resultscreen.textContent='';
    if (tekstas.length>0)
    {screen.textContent = tekstas.slice(0, -1);}
}

function skliaustas() // ) leidzia paspaust tik tada jei yra (
{
    const screen = document.getElementById('screen');
    if (screen.textContent.includes('(')) {screen.textContent += ')';}
}


const mygtukas = document.querySelector('.th2 .td2');
const informacija = document.getElementById('informacija');
let matymas = false; //kol nepaspaudzia mygtuko tol nerodo info, tai by default false
mygtukas.addEventListener('click', keisti);
function keisti() {
    matymas = !matymas;
    if (matymas) {
        informacija.style.display = 'block';
        mygtukas.textContent = "Slėpti informaciją apie 'error' ir 'undefined' atsakymus";
    } else {
        informacija.style.display = 'none';
        mygtukas.textContent = "Žiūrėti informaciją apie 'error' ir 'undefined' atsakymus";
    }
}

function dalinimas(veiksmas) // daromas masyvas kuriame oprandai atskiriami nuo operatoriu
{
    const regex = /(\d+(\.\d+)?|[+\–/×!^()√∛])/g;
    return veiksmas.match(regex);
}

function faktorialas(skaicius)   //faktorialo skaiciavimas
{
    if (skaicius<0 || skaicius%1!=0 ) {throw 'undefined';}
    else if (skaicius === 0 || skaicius === 1)
    {return 1;} 
    else 
    {
        let f = 1;
        for (let i = 2; i <= skaicius; i++)
        {f *= i;}
        return f;
    }
  }

function operacija(veiksmas) 
{
    //leidziama minusini skaiciu, jei jis pirmas visam veiksme, rasyt be skliaustu 
    if (veiksmas[0] === '–') {veiksmas.splice(0, 2, '-'+veiksmas[1]);}
    let stack = [];
    for (let i = 0; i < veiksmas.length; i++) {
        if (veiksmas[i] === '(') { //visu ( indeksai dedami i stacka
            stack.push(i);
        } else if (veiksmas[i] === ')') { //kai randamas pirmas instance of ) tada issimamas paskutinis idetas ) ir vykdomas veiksmas tarp skliaustu
            if (stack.length === 0) {throw 'error';} //dar del visa ko patikrinama ar buvo pirmas skliaustas
            let indeksas1 = stack.pop(); //is stacko istrinamas last instance of ( ir priskiriamas kintamajam indeksas1
            let veiksmas2 = veiksmas.slice(indeksas1 + 1, i);
            veiksmas.splice(indeksas1, i-indeksas1 + 1, operacija(veiksmas2));
            i -= (i - indeksas1);
        }
    }
    //po to skaiciuojami veiksmai: saknys ir kelimas laipsniu
    for (let i=0; i<veiksmas.length; i++)
    {
        if (veiksmas[i] === '√')
        {
            let sk1 = parseFloat(veiksmas[i + 1]);
            if (!isNaN(sk1))
            {
                sk1 = Math.sqrt(sk1);
                if (isNaN(sk1)) {throw 'undefined';}
                veiksmas.splice(i, 2, sk1);
            } 
            else {throw 'error';}
        }
        else if (veiksmas[i] === '^') 
        {
            let sk1 = parseFloat(veiksmas[i - 1]);
            let sk2 = parseFloat(veiksmas[i+1]);
            if (!isNaN(sk1))
            {
                veiksmas.splice(i - 1, 3, Math.pow(sk1, sk2));
                i -= 2;
            } 
            else {throw 'error';}
        }
        else if (veiksmas[i] === '∛')
        {
            let sk1 = parseFloat(veiksmas[i + 1]);
            if (!isNaN(sk1))
            {
                sk1 = Math.cbrt(sk1);
                veiksmas.splice(i, 2, sk1);
            } 
            else {throw 'error';}
        }
    }
    //po to skaiciuojamas faktorialas
    for (let i=0; i<veiksmas.length; i++)
    {
        if (veiksmas[i] === '!') 
        {
            let sk1 = parseFloat(veiksmas[i - 1]);
            if (!isNaN(sk1))
            {
                veiksmas.splice(i - 1, 2, faktorialas(sk1));
                i -= 1;
            } 
            else {throw 'error';}
        }
    }
    //tada dalyba ir daugyba
    for (let i = 0; i < veiksmas.length; i++) 
    {
    
        if (veiksmas[i] === '/') 
        {
            let sk1 = parseFloat(veiksmas[i - 1]);
            let sk2 = parseFloat(veiksmas[i + 1]);
            if (sk2 == 0) {throw 'undefined';}
            if (!isNaN(sk1) && !isNaN(sk2) && sk2 !== 0)
            {
                veiksmas.splice(i - 1, 3, sk1 / sk2);
                i -= 2;
            } 
            else {throw 'error';}
        }
        else if (veiksmas[i] === '×')
        {
            let sk1 = parseFloat(veiksmas[i - 1]);
            let sk2 = parseFloat(veiksmas[i + 1]);
            if (!isNaN(sk1) && !isNaN(sk2)) 
            {
                veiksmas.splice(i - 1, 3, sk1 * sk2);
                i -= 2;
            } 
            else 
            {throw 'error';}
        }
    }

    // paskutiniai sudetis ir atimtis
    let result = parseFloat(veiksmas[0]);
    for (let i = 1; i < veiksmas.length; i += 2) 
    {
        let operator = veiksmas[i];
        let operand = parseFloat(veiksmas[i + 1]);
        if (!isNaN(operand))
        {
            if (operator === '+')
            {result += operand;}
            else if (operator === '–')
            {result -= operand;}
            else {throw 'error';}
        }
        else {throw'error';}
    }

    return result; 
}

function skaiciavimas() {
    const screen = document.getElementById('screen');
    const veiksmas=dalinimas(screen.textContent);
    console.log(veiksmas);

    try {
        if (screen.textContent=='.') {throw 'error';}
        if (veiksmas==null) {throw '';}
        let result = operacija(veiksmas);
        if (result<0) {result='–'+result*(-1);}
        if (isNaN(result)) {resultscreen.textContent='error'}
        else {resultscreen.textContent = '= ' + result + ' ';}
    } catch (Error) {
        resultscreen.textContent = Error;
    }
}



