document.querySelector("#easybtn").addEventListener("click", function() {
    selectDifficulty("#easybtn");
});

document.querySelector("#hardbtn").addEventListener("click", function() {
    selectDifficulty("#hardbtn");
});

document.querySelector("#start").addEventListener("click", function() {
    if(savePlayerName()){
        startGame()
    }
})

document.querySelector("#description").addEventListener("click", function() {
    showRules()
})

let playerName = ""
let startTime;
let timerInterval;
let difficulty = "easy";
let selectedLevel;
let allfilled = 0
let elapsedTimeFormatted = '';
let oasiscount = 0

const easy1 = [
    ["empty", "mountain90", "empty", "empty", "oasis"],
    ["empty", "empty", "empty", "bridge", "oasis"],
    ["bridge", "empty", "mountain180", "empty", "empty"],
    ["empty", "empty", "empty", "oasis", "empty"],
    ["empty", "empty", "mountain270", "empty", "empty"]
];

const easy2 = [
    ["oasis", "empty", "bridge90", "empty", "empty"],
    ["empty", "mountain180", "empty", "empty", "mountain180"],
    ["bridge", "oasis", "mountain270", "empty", "empty"],
    ["empty", "empty", "empty", "oasis", "empty"],
    ["empty", "empty", "empty", "empty", "empty"]
];

const easy3 = [
    ["empty", "empty", "bridge90", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "bridge"],
    ["empty", "mountain180", "bridge", "empty", "empty"],
    ["empty", "oasis", "empty", "empty", "empty"],
    ["empty", "bridge90", "empty", "empty", "mountain180"]
];

const easy4 = [
    ["empty", "empty", "empty", "bridge90", "empty"],
    ["empty", "empty", "empty", "empty", "empty"],
    ["bridge", "empty", "mountain90", "empty", "mountain90"],
    ["empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "oasis", "mountain270", "empty"]
];

const easy5 = [
    ["empty", "empty", "bridge90", "empty", "empty"],
    ["empty", "mountain", "empty", "empty", "empty"],
    ["bridge", "empty", "empty", "mountain270", "empty"],
    ["empty", "empty", "bridge", "oasis", "empty"],
    ["empty", "mountain180", "empty", "empty", "empty"]
];

const easyLevels = [easy1, easy2, easy3, easy4, easy5];

const hard1 = [
    ["empty", "mountain90", "oasis", "oasis", "empty", "bridge90", "empty"],
    ["bridge", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "bridge", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "mountain270", "empty", "empty", "empty"],
    ["mountain270", "empty", "mountain90", "empty", "bridge90", "empty", "oasis"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "bridge90", "empty", "empty", "empty"],
];

const hard2 = [
    ["empty", "empty", "oasis", "empty", "empty", "empty", "empty"],
    ["bridge", "empty", "bridge90", "empty", "empty", "mountain180", "empty"],
    ["empty", "empty", "bridge90", "empty", "empty", "empty", "bridge"],
    ["mountain", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "oasis", "empty", "mountain90", "empty", "empty", "empty"],
    ["empty", "mountain", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "oasis", "empty", "empty", "empty", "empty"],
];

const hard3 = [
    ["empty", "empty", "bridge90", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "bridge"],
    ["oasis", "empty", "mountain270", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "oasis", "mountain270", "empty", "bridge90", "empty", "empty"],
    ["bridge", "empty", "empty", "empty", "empty", "mountain90", "empty"],
    ["empty", "empty", "oasis", "mountain270", "empty", "empty", "empty"],
];

const hard4 = [
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "bridge", "empty", "mountain180", "empty"],
    ["empty", "empty", "mountain270", "empty", "empty", "empty", "empty"],
    ["empty", "bridge90", "empty", "oasis", "empty", "bridge90", "empty"],
    ["empty", "empty", "mountain180", "empty", "mountain90", "empty", "empty"],
    ["bridge", "empty", "empty", "empty", "empty", "mountain270", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
];

const hard5 = [
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "mountain", "empty"],
    ["empty", "bridge90", "bridge90", "empty", "mountain90", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "mountain", "empty", "oasis", "empty", "empty"],
    ["empty", "mountain180", "empty", "bridge", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
];

const hardLevels = [hard1, hard2, hard3, hard4, hard5];

function selectDifficulty(selectedButtonSelector) {
    document.querySelectorAll(".difficulty-button").forEach(button => {
        button.classList.remove("picked");
    });

    document.querySelector(selectedButtonSelector).classList.add("picked");
    difficulty = selectedButtonSelector === "#easybtn" ? "easy" : "hard";
}



function startGame(){
    document.querySelector("#menu").classList.add("hidden")
    document.querySelector("#rules").classList.add("hidden")
    document.querySelector("#game").classList.remove("hidden")
    document.querySelector("#toplist").classList.add("hidden")

    document.querySelector("#realname").textContent = playerName;

    document.querySelector("#menubtngame").addEventListener("click", function() {
        showMenu()
    })

    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
    generateTable();
}

function generateTable() {
    const tbody = document.querySelector("#map tbody");

    oasiscount = 0

    tbody.innerHTML = "";
    
    
    if (difficulty === "easy") {
        const randomIndex = Math.floor(Math.random() * easyLevels.length); 
        selectedLevel = easyLevels[randomIndex];
    } else {
        const randomIndex = Math.floor(Math.random() * hardLevels.length);
        selectedLevel = hardLevels[randomIndex];
    }
    
    selectedLevel.forEach(row => {
        const tr = document.createElement("tr");
        
        row.forEach(cell => {

            const td = document.createElement("td");
            td.classList.add("cell");

            const img = document.createElement("img");
            img.classList.add("tile-image"); 

            if (cell === "empty") {
                img.src = "pics/tiles/empty.png";
                td.right = 0
                td.left = 0
                td.up = 0
                td.down = 0
            } else if (cell === "mountain") {
                img.src = "pics/tiles/mountain.png";
                td.right = 1
                td.left = 0
                td.up = 0
                td.down = 1
            }  else if (cell === "mountain90") {
                img.src = "pics/tiles/mountain.png";
                img.style.transform = "rotate(90deg)"; 
                td.right = 0
                td.left = 1
                td.up = 0
                td.down = 1
            } else if (cell === "mountain180") {
                img.src = "pics/tiles/mountain.png";
                img.style.transform = "rotate(180deg)";
                td.right = 0
                td.left = 1
                td.up = 1
                td.down = 0 
            } else if (cell === "mountain270") {
                img.src = "pics/tiles/mountain.png";
                img.style.transform = "rotate(270deg)"; 
                td.right = 1
                td.left = 0
                td.up = 1
                td.down = 0
            } else if (cell === "bridge") {
                img.src = "pics/tiles/bridge.png";
                td.right = 0
                td.left = 0
                td.up = 1
                td.down = 1
            } else if (cell === "bridge90") {
                img.src = "pics/tiles/bridge.png";
                img.style.transform = "rotate(90deg)";
                td.right = 1
                td.left = 1
                td.up = 0
                td.down = 0
            } else if (cell === "oasis") {
                img.src = "pics/tiles/oasis.png";
                td.filled = 1
                oasiscount += 1
            }

            if(cell === "oasis"){
                td.filled = 1
            }else{
                td.filled = 0
            }
            

            td.cycleCount = 0;
            td.nev = cell
            td.visited = false

            td.addEventListener("click", function() {
                itemPicking(td,img)
            });

            td.appendChild(img); 
            tr.appendChild(td); 
        });

        tbody.appendChild(tr);
    });
}

function itemPicking(td,img){
    const images = [
        "pics/tiles/curve_rail.png",
        "pics/tiles/curve_rail2.png",
        "pics/tiles/curve_rail3.png",
        "pics/tiles/curve_rail4.png",
        "pics/tiles/straight_rail.png",
        "pics/tiles/straight_rail2.png"
    ];

    const imagesm = [
        "pics/tiles/mountain_rail.png",
    ]

    const imagesb = [
        "pics/tiles/bridge_rail.png"
    ]
    
    if(td.nev == "oasis"){
        
    }
    else if(td.nev == "mountain"){
        img.src = imagesm[td.cycleCount]
        td.filled = 1
    }
    else if(td.nev == "mountain90"){
        img.src = imagesm[td.cycleCount]
        td.filled = 1
    }
    else if(td.nev == "mountain180"){
        img.src = imagesm[td.cycleCount]
        td.filled = 1
    }
    else if(td.nev == "mountain270"){
        img.src = imagesm[td.cycleCount]
        td.filled = 1
    }
    else if(td.nev == "bridge"){
        img.src = imagesb[td.cycleCount]
        td.filled = 1
    }
    else if(td.nev == "bridge90"){
        img.src = imagesb[td.cycleCount]
        td.filled = 1
    }
    else{
        img.src = images[td.cycleCount];
        td.filled = 1
        if(td.cycleCount == 0){
            td.right = 1
            td.left = 0
            td.up = 0
            td.down = 1
        }
        else if(td.cycleCount == 1){
            td.right = 0
            td.left = 1
            td.up = 0
            td.down = 1
        }else if(td.cycleCount == 2){
            td.right = 0
            td.left = 1
            td.up = 1
            td.down = 0
        } else if(td.cycleCount == 3){
            td.right = 1
            td.left = 0
            td.up = 1
            td.down = 0
        } else if(td.cycleCount == 4){
            td.right = 0
            td.left = 0
            td.up = 1
            td.down = 1
        } else if(td.cycleCount == 5){
            td.right = 1
            td.left = 1
            td.up = 0
            td.down = 0
        }
    }

    td.cycleCount = (td.cycleCount + 1) 
    if(td.nev != "empty"){
        if(td.cycleCount == 1){
            td.cycleCount = 0
        }
    }
    else{
        if(td.cycleCount == 6){
            td.cycleCount = 0
        }
    }
    
    checkFilledNumber()

    const totalElements = selectedLevel.length * selectedLevel[0].length;

    if(allfilled == totalElements){
        console.clear()
        checkCorrectTable()
    }
}

function checkFilledNumber(){
    allfilled = 0
    const cells = document.querySelectorAll("#map tbody td");

    cells.forEach(cell => {
        if (cell.filled == 1) {
            allfilled += cell.filled
        } 
    });
}

function showRules(){
    document.querySelector("#menu").classList.add("hidden")
    document.querySelector("#rules").classList.remove("hidden")
    document.querySelector("#game").classList.add("hidden")
    document.querySelector("#toplist").classList.add("hidden")

    document.querySelector("#menubtndes").addEventListener("click", function() {
        showMenu()
    })
}

function showMenu(){
    document.querySelector("#menu").classList.remove("hidden")
    document.querySelector("#rules").classList.add("hidden")
    document.querySelector("#game").classList.add("hidden")
    document.querySelector("#toplist").classList.add("hidden")
    const nameInput = document.querySelector('#nameinput input');
    nameInput.value = '';
}

function showToplist(){
    displayLeaderboard(difficulty)
    document.querySelector("#ido").textContent = elapsedTimeFormatted;
    document.querySelector("#menu").classList.add("hidden")
    document.querySelector("#rules").classList.add("hidden")
    document.querySelector("#game").classList.add("hidden")
    document.querySelector("#toplist").classList.remove("hidden")
    document.querySelector("#menubtntop").addEventListener("click", function() {
        showMenu()
    })
}

function savePlayerName() {
    playerName = document.querySelector("#nameinput input").value.trim();
    if (playerName != "") {
        return true; 
    }
    return false; 
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startTime);

    const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, '0');
    const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, '0');
    document.querySelector("#realtime").textContent = minutes + ":" + seconds;
}

function stopTimer() {
    clearInterval(timerInterval);
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startTime);

    const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, '0');
    const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, '0');
    
    elapsedTimeFormatted = minutes + ":" + seconds;
}

function resetVisited(){
    const cells = document.querySelectorAll("#map tbody td");

    cells.forEach(cell => {
        cell.visited = false 
    });
}


function checkCorrectTable(){
    resetVisited()

    const rows = selectedLevel.length;
    const cols = selectedLevel[0].length;

    const cells = document.querySelectorAll("#map tbody td");
    let i = 0
    let j = 0
    let index = i * cols + j;
    let good = 0
    while(cells[index].nev == "oasis"){
        index += 1
    }

    let first = index
    while(cells[index].visited == false){
        if((index+1) < (cols*rows) && cells[index].right == 1 && cells[index+1].left == 1 && (!cells[index+1].visited || (index+1) == first)){
            cells[index].visited = true
            good += 1
            console.log(index)
            index += 1
        } else if ((index+cols) < (cols*rows) && cells[index].down == 1 && cells[index+cols].up == 1 && (!cells[index+cols].visited || (index+cols) == first)) {
            cells[index].visited = true
            good += 1
            console.log(index)
            index += cols
        } else if (index-1 >= 0 && cells[index].left == 1 && cells[index-1].right == 1 && (!cells[index-1].visited) || (index-1 == first)) {
            cells[index].visited = true
            good += 1
            console.log(index)
            index -= 1
        } else if (index-cols >= 0 && cells[index].up == 1 && cells[index-cols].down == 1 && (!cells[index-cols].visited || (index-cols) == first)) {
            cells[index].visited = true
            good += 1
            console.log(index)
            index -= cols
        } else{
            break;
        }
    }    
    
    if((good + oasiscount) == (rows*cols)){
        stopTimer()
        setTimeout(function() {
            showToplist();
        }, 5000);
    }
}

function loadLeaderboard(difficulty) {
    const leaderboard = JSON.parse(localStorage.getItem(`leaderboard_${difficulty}`)) || [];
    return leaderboard;
}

function saveLeaderboard(difficulty, leaderboard) {
    localStorage.setItem(`leaderboard_${difficulty}`, JSON.stringify(leaderboard));
}

function timeToSeconds(time) {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
}

function updateLeaderboard(difficulty, playerName, time) {
    let leaderboard = loadLeaderboard(difficulty);
    leaderboard.push({ name: playerName, time: time });
    leaderboard.sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time)); 
    leaderboard = leaderboard.slice(0, 10); 
    saveLeaderboard(difficulty, leaderboard);
}

function displayLeaderboard(difficulty) {
    updateLeaderboard(difficulty, playerName, elapsedTimeFormatted)
    const leaderboard = loadLeaderboard(difficulty);

    const leaderboardContainer = document.querySelector("#toplistpanel");
    leaderboardContainer.innerHTML = "<h3>Toplista</h3>";
    
    leaderboard.forEach((entry, index) => {
        const entryElement = document.createElement("p");
        entryElement.textContent = `${index + 1}. ${entry.name}: ${entry.time} másodperc`;
        leaderboardContainer.appendChild(entryElement);
    });
}