const pacman = document.getElementById("pacman")

let enemiesAdded = 0
let enemyOnScreen = false

const handleNewEnemy = (enemy) => {
  enemyOnScreen = true

  let enemyPos = {
    left: 0,
    top: 0
  }

  const updatePacmanPos = () => {
    const { left, top } = document.getElementById(`${enemiesAdded - 1}`).getBoundingClientRect()
    
    enemyPos = {
      left,
      top
    }
  }

  const detectColission = () => {
    const playerPosX = playerPos.left + playerInfo.width
    const pacmanPosX = enemyPos.left + 55
    const playerPosY = playerPos.top + playerInfo.heigth
    const pacmanPosY = enemyPos.top + 47

    const detectCollisionHorizontal = () => {
      if (enemyPos.left < playerPosX && pacmanPosX > playerPos.left) return true
      return false
    }

    const detectCollisionVertical = () => {
      if (pacmanPosY > playerPos.top && enemyPos.top < playerPosY) return true
      return false
    }

    if (detectCollisionHorizontal() && detectCollisionVertical()) {
      console.log("COLISION")
      playerCollisioned()
      enemy.style.transform = `translateX(-52rem) translateY(-100px)`
      enemy.style.animationPlayState = "paused"
    }
  }

  const interval = setInterval(() => {
    updatePacmanPos()
    detectColission()
  }, 60);
  
  enemy.ontransitionend = () => {
    clearInterval(interval)
    if (playerLost) return
    game.removeChild(enemy)
    enemyOnScreen = false
    playerPoints++
    pointsCounter.textContent = playerPoints
  }
  
  enemy.style.transform = "translateX(-74rem) translateY(-100px)"
}

const generateEnemy = () => {
  const enemy = document.createElement("div")
  enemy.classList.add("pacman")
  enemy.id = enemiesAdded
  game.appendChild(enemy)
  setTimeout(() => {
    handleNewEnemy(enemy)
  }, 60);
  enemiesAdded++
}

setInterval(() => {
  if (!enemyOnScreen && gameStarted) generateEnemy()
}, 5000);