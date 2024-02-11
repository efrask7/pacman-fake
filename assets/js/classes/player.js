const playerInDom = document.getElementById("player")

class Player {
  width = 0
  heigth = 0
  initialTransformY = 0
  jumping = false
  speed = ""

  pos = {
    left: 0,
    top: 0
  }

  constructor(size, transformY, speed) {
    const { width, heigth } = size
    this.width = width
    this.heigth = heigth
    this.initialTransformY = transformY
    this.speed = speed
  }

  updatePos() {
    const { left, top } = playerInDom.getBoundingClientRect()

    this.pos = {
      left,
      top
    }
  }

  jump() {
    this.jumping = true
    playerInDom.style.animationPlayState = "paused"
    playerInDom.style.transform = `translateY(${this.initialTransformY - 85}px)`
  }

  fall() {
    this.jumping = false
    playerInDom.style.transform = `translateY(${this.initialTransformY}px)`
  }  

  updateStyle(style, value) {
    playerInDom.style[style] = value
  }

  updateSpeed(speed) {
    this.speed = speed
  }

  getPos() {
    return this.pos
  }

  getSize() {
    return {
      width: this.width,
      heigth: this.heigth
    }
  }

  getSpeed() {
    return this.speed
  }

  getJumping() {
    return this.jumping
  }

  animFall() {
    playerInDom.style.transform = `translateY(${this.initialTransformY}px)`
    setTimeout(() => {
      this.jumping = false
    }, 500);
  }

  animRunning() {
    playerInDom.style.animationPlayState = "running"
  }

  collision() {
    playerInDom.style.animationPlayState = "paused"
    playerInDom.style.transition = "transform 1.5s"
    playerInDom.style.transform = `translateY(${this.initialTransformY}px) scale(0)`
  }
}