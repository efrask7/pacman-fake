const player = document.getElementById("player")

const playerInfo = {
  width: 68,
  heigth: 77,
  initialTransformY: -100,
  jumping: false,
  speed: ".5s"
}


let playerPos = {
  left: 0,
  top: 0
}

const updatePlayerPos = () => {
  const { left, top } = document.getElementById("player").getBoundingClientRect()

  playerPos = {
    left,
    top
  }
}

setInterval(() => {
  player.style.transition = playerInfo.speed
  if (!gameStarted) return
  updatePlayerPos()
}, 60);

const jump = () => {
  if (gameStarted && !playerInfo.jumping && !playerLost) {
    playerInfo.jumping = true
    player.style.animationPlayState = "paused"
    player.style.transform = `translateY(${playerInfo.initialTransformY - 85}px)`
    playSound("jump")
  }
}

btnJump.onclick = () => jump()

document.onkeydown = (ev) => {
  if (ev.key === "ArrowUp" || ev.code === "Space") {
    jump()
  }
  if (ev.key === "ArrowDown") {
    playerInfo.jumping = false
    player.style.transform = `translateY(${playerInfo.initialTransformY}px)`
  }
}

player.ontransitionend = () => {
  if (playerInfo.jumping) {
    player.style.transform = `translateY(${playerInfo.initialTransformY}px)`
    setTimeout(() => {
      playerInfo.jumping = false
    }, 500);
  }

  if (!playerInfo.jumping) {
    player.style.animationPlayState = "running"
  }
}

const playerCollisioned = () => {
  player.style.animationPlayState = "paused"
  game.style.animationPlayState = "paused"
  playerLost = true
  restartBtn()
  playSound("die")
  player.style.transition = "transform 1.5s"
  player.style.transform = `translateY(${playerInfo.initialTransformY}px) scale(0)`
  checkForMaxPoints()
  resetScreen.style.transform = "scale(1)"
}