import professionScoring from './professions.js';
const divnavq = document.getElementById("navans")
const otdelnav = document.getElementById("otdelnav")
const divint = document.getElementById("intans")
const finlab = document.getElementById("finlab")
var slovarcheck = {}
var slovarAPI = {}
var ITslovar = {}
function plavan(farg, sarg, nowind){
    var tocount = 0
    var keys = Object.keys(slovarcheck)
    var len = farg.querySelectorAll('div').length
    keys.forEach(nowel=>{
        if (nowel[0]==nowind){
            tocount += 1
        }
    })
    if (tocount==len){
        farg.classList.add("slowdown")
        farg.classList.add("forint")
        setTimeout(()=>{farg.classList.add("donone")},2500)
        setTimeout(()=>{
        sarg.classList.remove("donone")
        setTimeout(()=>{sarg.classList.remove("forint")
        sarg.classList.add("slowup")},10)},2500)
    }
    else{
        alert("Не отмечены все ответы")
    }
    if(nowind=="3" && tocount==len){
        giveres()
    }
}
function giveres(){
    professionScoring.professions.forEach(now=>{
        let cou = 0
        console.log(now)
        Object.values(now.questions_scores).forEach((what, index)=>{
            cou += Object.values(slovarcheck)[index] * what
        })
        ITslovar[now.name] = cou
    })
    var itog = Object.entries(ITslovar).sort((a, b)=>b[1]-a[1])
    var textarea = "Самая подходящая профессия: " + itog[0][0] + "<br>" + "Все результаты: <br><br>"
    itog.forEach(now=>{
        textarea += `Профессия: ${now[0]}, баллы: ${now[1].toFixed(2)}<br><br>`
        fetch(`http://opendata.trudvsem.ru/api/v1/vacancies?text=${now[0]}`) 
        .then(response => {  
        if (!response.ok) {  
            throw new Error(`HTTP ошибка! Код: ${response.status}`);  
        }  
            return response.json();  
        })  
        .then(data => {  
            console.log('Данные из API:', data);  
        })  
.catch(error => {  
    console.error('Ошибка при выполнении запроса:', error);  
});
    })
    finlab.innerHTML = textarea
}
function backplavan(farg, sarg, nowind){
    farg.classList.add("slowdown")
    farg.classList.add("forint")
    setTimeout(()=>{farg.classList.add("donone")},2500)
    setTimeout(()=>{
    sarg.classList.remove("donone")
    setTimeout(()=>{sarg.classList.remove("forint")
    sarg.classList.add("slowup")},10)},2500)
}
const backnav = document.getElementById("backnav")
const sendint = document.getElementById("sendint")
const finishanketing = document.getElementById("finishanketing")
const sendpernav = document.getElementById("sendpernav")
const sendnav = document.getElementById("sendnav")
sendnav.addEventListener("click", ()=>plavan(divnavq, otdelnav, '1'))
const nav16 = document.getElementById("nav16")
const backint = document.getElementById("backint")
backint.addEventListener("click", ()=>backplavan(divint, otdelnav))
sendpernav.addEventListener("click",()=> plavan(otdelnav, divint, '2'))
backnav.addEventListener("click", ()=>backplavan(otdelnav, divnavq))
const butstartanket = document.getElementById("butstartanket")
const startanketing = document.getElementById("startanketing")
butstartanket.addEventListener("click", ()=>plavan(startanketing, divnavq, '0'))
sendint.addEventListener("click", ()=>plavan(divint, finishanketing, '3'))
const navdiv = divnavq.querySelectorAll("div")
function activebut(what, yind){
    var whatsnow = what.querySelectorAll('div')
    var nowlabel = what.querySelectorAll("label")
    whatsnow.forEach((now, ind)=>{
    var nowbut = now.querySelectorAll("button")
    nowbut.forEach(clc=>{
        clc.addEventListener("click", function(){
            nowbut.forEach(make=>{
                make.style.backgroundColor = ""
            })
            clc.style.backgroundColor = "orange"
            slovarcheck[String(yind+1) + " " + String(ind+1)] = clc.textContent
            slovarAPI[nowlabel[ind].textContent.slice(2)] = clc.textContent
        })
    })
})
}
[divnavq, otdelnav, divint].forEach((fnum, find)=>{
    activebut(fnum, find)
})
