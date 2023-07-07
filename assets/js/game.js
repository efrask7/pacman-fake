const game = document.getElementById("game")
const pointsCounter = document.getElementById("points")
const btnInit = document.getElementById("btn-init")
const btnStart = document.getElementById("btn-start")
const btnJump = document.getElementById("btn-jump")
const intro = document.getElementById("intro")

const URIWithoutIntro = window.location.search 
  ? window.location.href
  : window.location.href + "?hideintro=1"

let gameStarted = false
let playerLost = false
let playerPoints = 0
let pointsActualSpeed = 500

btnInit.onclick = () => {
  gameStarted = true
  game.style.animationPlayState = "running"
  player.style.animationPlayState = "running"

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
  }
}

const generateTimeout = () => {
  return setTimeout(() => {
    updatePoints()
    generateTimeout()
  }, pointsActualSpeed)
}

generateTimeout()