const game = document.getElementById("game")
const pointsCounter = document.getElementById("points")
const pointsCounterInDeadScreen = document.getElementById("actual")
const btnInit = document.getElementById("btn-init")
const btnRestart = document.getElementById("btn-reset")
const btnStart = document.getElementById("btn-start")
const btnJump = document.getElementById("btn-jump")
const intro = document.getElementById("intro")
const maxPointsCounter = document.getElementById("max-points")
const resetScreen = document.querySelector(".deadScreen")
const newMaxPointsText = document.getElementById("newMaxPoints")

const maxPoints = localStorage.getItem("maxPoints") | 0
maxPointsCounter.textContent = maxPoints


const URIWithoutIntro = window.location.search 
? window.location.href
: window.location.href + "?hideintro=1"

let gameStarted = false
let playerLost = false
let playerPoints = 0
let pointsActualSpeed = 500
let maxPointsAlerted = false

if (maxPoints === 0) maxPointsAlerted = true

const checkForMaxPoints = () => {
  if (playerPoints > maxPoints) {
    maxPointsCounter.textContent = playerPoints
    newMaxPointsText.style.display = "block"
    localStorage.setItem("maxPoints", playerPoints)
    playSound("maxPoints")
  }
}

btnInit.onclick = () => {
  gameStarted = true
  game.style.animationPlayState = "running"
  player.style.animationPlayState = "running"
  playSound("start")

  // btnInit.style.opacity = 0
  btnInit.style.transform = "scale(0)"
  setTimeout(() => {
    // btnInit.style.opacity = 1
    btnJump.style.transform = "scale(1)"
  }, 300);

  btnInit.onclick = null
}

const restartBtn = () => {
  btnInit.textContent = "Reiniciar"
  btnJump.style.transform = "scale(0)"
  btnInit.style.transform = "scale(1)"

  btnInit.onclick = () => {
    window.location = URIWithoutIntro
  }
  btnRestart.onclick = () => {
    window.location = URIWithoutIntro
  }
}

btnStart.onmouseenter = () => {
  document.querySelector("#intro > h1").style.letterSpacing = "10px"
}

btnStart.onmouseout = () => {
  document.querySelector("#intro > h1").style.letterSpacing = "1px"
}

btnStart.onclick = () => {
  btnStart.style.width = 0
  btnStart.style.height = 0

  setInterval(() => {
    intro.style.transform = "translateY(-200%)"
  }, 300);
}

if (window.location.search) {
  const vars = new URLSearchParams(window.location.search)
  if (vars.get("hideintro")) {
    intro.style.display = "none"
  }
}

const updatePoints = () => {
  if (gameStarted && !playerLost) {  
    playerPoints++
    pointsCounter.textContent = playerPoints
    pointsCounterInDeadScreen.textContent = playerPoints
  }
}

const generateTimeout = () => {
  return setTimeout(() => {
    updatePoints()
    generateTimeout()
    if (playerPoints > maxPoints && !maxPointsAlerted) {
      playSound("maxPointsInGame")
      maxPointsAlerted = true
    }
  }, pointsActualSpeed)
}

generateTimeout()