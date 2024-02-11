const player = document.getElementById("player")

const GamePlayer = new Player({ width: 68, heigth: 77 }, -100, ".5s")

setInterval(() => {
  GamePlayer.updateStyle("transition", GamePlayer.getSpeed())
  if (!gameStarted) return
  GamePlayer.updatePos()
}, 60);

const jump = () => {
  if (gameStarted && !GamePlayer.getJumping() && !playerLost) {
    GamePlayer.jump()
    Sounds.play("jump")
  }
}

btnJump.onclick = () => jump()

document.onkeydown = (ev) => {
  if (ev.key === "ArrowUp" || ev.code === "Space") {
    jump()
  }
  if (ev.key === "ArrowDown") {
    GamePlayer.fall()
  }
}

player.ontransitionend = () => {
  if (GamePlayer.getJumping()) {
    GamePlayer.animFall()
  } 
  else if (!GamePlayer.getJumping()) {
    GamePlayer.animRunning()
  }
}

const playerCollisioned = () => {
  GamePlayer.collision()
  game.style.animationPlayState = "paused"
  playerLost = true
  restartBtn()
  Sounds.play("die")
  checkForMaxPoints()
  resetScreen.style.transform = "scale(1)"
}