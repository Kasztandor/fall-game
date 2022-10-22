let main = document.querySelector("main")
let mainLoop, keyPressEvent, spawner
let ponits, speed, tracks, spawnSpeed

function selectValue(x){
    for (var i=0; i<document.querySelector(x).options.length; i++){
        if (document.querySelector(x)[i].selected){
            return document.querySelector(x)[i].value
        }
    }
}

function startScreen(){
    main.innerHTML = `
    <div id="startScreen">
        <h1>Fall game!</h1>
        <div id="settings">
            <div id="basic">
                Level: <select id="level">
                    <option value="HELL">HELL</option>
                    <option value="Hard">Hard</option>
                    <option value="Medium" selected="selected">Medium</option>
                    <option value="Easy">Easy</option>
                </select>
            </div>
            <label><input type="checkbox" id="advancedCheckbox">Advanced settings</label>
            <div id="advanced">
                Speed: <select id="speed">
                    <option>HELL</option>
                    <optionInsane</option>
                    <option>Fast</option>
                    <option selected="selected">Normal</option>
                    <option>Slow</option>
                    <option>Turtle</option>
                </select><br>
                Tracks: <select id="tracks">
                    <option>4</option>
                    <option>6</option>
                    <option selected="selected">8</option>
                    <option>10</option>
                </select><br>
                Spawn speed: <select id="spawnSpeed">
                    <option>5/s</option>
                    <option>2/s</option>
                    <option selected="selected">1/s</option>
                    <option>0.5/s</option>
                    <option>0.25/s</option>
                </select>
            </div>
        </div>
        <button>Start</button>
    </div>`
    document.querySelector("button").addEventListener("click",gameStart)
    document.querySelector("#advancedCheckbox").addEventListener("click",()=>{
        if (document.querySelector("#advancedCheckbox").checked == true){
            document.documentElement.style.setProperty("--hei","100%")
        }
        else{
            document.documentElement.style.setProperty("--hei", "0%")
        }
    })
}

function newTarget(x=Math.floor(Math.random()*tracks)){
    console.log(x)
    document.querySelector("#d"+x).innerHTML+='<div class="target" style="top: -3%;">'+(x<9?(x+1):0)+'</div>'
}

function gameStart(){
    speed = 1
    tracks = 8
    spawnSpeed = 1
    if (document.querySelector("#advancedCheckbox").checked == false){
        let lvl = selectValue("#level")
        switch (lvl){
            case "HELL":
                speed = 5
                tracks = 8
                spawnSpeed = 5
                break
            case "Hard":
                speed = 2
                tracks = 8
                spawnSpeed = 2
                break
            case "Medium":
                speed = 1
                tracks = 8
                spawnSpeed = 1
                break
            case "Easy":
                speed = 1
                tracks = 4
                spawnSpeed = 0.5
                break
        }
    }

    let inner = `<div id="game">`
    for (var i = 0; i<tracks; i++){
        inner += '<div id="d'+i+'" class="track"></div>'
    }
    inner += `<div id="line"></div>
    <div id="score">0</div>
    </div>`

    main.innerHTML = inner

    points = 0

    mainLoop = setInterval(()=>{
        document.querySelectorAll(".target").forEach((i)=>{
            var distance = parseInt(i.style.top.slice(0,i.style.top.length-1))
            i.style.top = (distance+1*speed)+"%"
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
        document.querySelector("#d"+(i-49)).childNodes.forEach((i)=>{
            if (i.classList.contains("greenTarget")){
                points+=1
                flag=0
                i.remove()
            }
        })
        points+=flag
    })
    spawner = setInterval(newTarget,1000/spawnSpeed)
}

window.onload=startScreen