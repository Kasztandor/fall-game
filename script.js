let main = document.querySelector("main")
let mainLoop, keyPressEvent, spawner
let ponits

function startScreen(){
    main.innerHTML = `
    <div id="startScreen">
        <h1>Rozpocznij grę!</h1>
        <button>Start</button>
    </div>`
    document.querySelector("button").addEventListener("click",gameStart)
}

function newTarget(x=Math.ceil(Math.random()*4)){
    document.querySelector("#d"+x).innerHTML+='<div class="target" style="top: -3%;">'+x+'</div>'
}

function gameStart(){
    main.innerHTML = `
    <div id="game">
        <div id="d1"></div>
        <div id="d2"></div>
        <div id="d3"></div>
        <div id="d4"></div>
        <div id="line"></div>
        <div id="score">0</div>
    </div>
    `

    points = 0

    mainLoop = setInterval(()=>{
        document.querySelectorAll(".target").forEach((i)=>{
            var distance = parseInt(i.style.top.slice(0,i.style.top.length-1))
            i.style.top = (distance+1)+"%"
            if (distance>103){
                i.remove()
                points-=1
            }
            else if (distance>83){
                i.classList.remove("greenTarget")
            }
            else if (distance>77){
                i.classList.add("greenTarget")
            }
        })
        document.querySelector("#score").innerHTML = points
    },33)
    keyPressEvent = document.addEventListener('keypress', (e) => {
        var i = e.charCode //49-52
        var flag = -1
        document.querySelector("#d"+(i-48)).childNodes.forEach((i)=>{
            if (i.classList.contains("greenTarget")){
                points+=1
                flag=0
                i.remove()
            }
        })
        points+=flag
    })
    spawner = setInterval(newTarget,1000)
}

window.onload=startScreen