const sounds = {
  jump: new Audio("./assets/audio/jump.mp3"),
  die: new Audio("./assets/audio/die.mp3"),
  point: new Audio("./assets/audio/point.mp3")
}

const playSound = (soundName) => {
  sounds[soundName].volume = "0.5"
  sounds[soundName].play()
}