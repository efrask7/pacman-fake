const pacman = document.getElementById("pacman")
const dangerIcon = document.getElementById("danger")

let enemiesAdded = 0
let enemyOnScreen = false

const enemySpeed = {
  slow: ["speed-slow", "speed-slow-s", "speed-slow-n", "speed-slow-f"],
  normal: ["speed-normal", "speed-normal-s", "speed-normal-n", "speed-normal-f"],
  fast: ["speed-fast", "speed-fast-s", "speed-fast-n", "speed-fast-f"]
}

const pointsSpeed = {
  slow: 500,
  normal: 300,
  fast: 100
}

let actualSpeed = "slow"
let actualSpeedIndexOfNames = 0
let actualSpeedIndex = 0

const timeoutGenerateMs = [10000, 5000, 20000]

const generateTimeoutForEnemySpeed = () => {
  const randomNum = Math.floor(Math.random() * timeoutGenerateMs.length)
  
  return setTimeout(() => {
    if (!gameStarted || playerLost) return;
    if (actualSpeedIndexOfNames === 2 && actualSpeedIndex === 3) {
      return
    }
    if (actualSpeedIndex !== 3) {
      actualSpeedIndex++
    } else {
      actualSpeedIndex = 0
      actualSpeed = Object.keys(enemySpeed)[actualSpeedIndexOfNames + 1]
      actualSpeedIndexOfNames++
    }

    if (actualSpeed === "fast") {
      GamePlayer.updateSpeed(".2s")
    }

    pointsActualSpeed = pointsSpeed[actualSpeed]
    generateTimeoutForEnemySpeed()
  }, timeoutGenerateMs[randomNum]);
}

const intervalSpeed = setInterval(() => {
  if (gameStarted) {
    generateTimeoutForEnemySpeed()
    clearInterval(intervalSpeed)
  }
}, 60)

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
    const playerPos = GamePlayer.getPos()
    const playerInfo = GamePlayer.getSize()
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
      playerCollisioned()
      enemy.style.transform = `translateX(-52rem) translateY(-100px)`
      enemy.style.animationPlayState = "paused"
    }
  }

  const interval = setInterval(() => {
    if (playerLost) return
    updatePacmanPos()
    detectColission()
  }, 0);
  
  enemy.ontransitionend = () => {
    clearInterval(interval)
    if (playerLost) return
    game.removeChild(enemy)
    enemyOnScreen = false
    Sounds.play("point")
  }
  
  enemy.style.transform = "translateX(-74rem) translateY(-100px)"
}

const generateEnemy = () => {  
  const enemy = document.createElement("div")
  enemy.classList.add("pacman")
  enemy.classList.add(enemySpeed[actualSpeed][actualSpeedIndex])
  enemy.id = enemiesAdded
  game.appendChild(enemy)


  setTimeout(() => {
    handleNewEnemy(enemy)
  }, 60);
  enemiesAdded++
}

setInterval(() => {
  if (!enemyOnScreen && gameStarted) {
    if (actualSpeed === "fast") {
      dangerIcon.style.display = "grid"
  
      setTimeout(() => {
        dangerIcon.style.display = "none"
        generateEnemy()
      }, 500)
    } else {
      generateEnemy()
    }
  }
}, 3000)