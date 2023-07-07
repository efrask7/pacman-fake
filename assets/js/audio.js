const sounds = {
  jump: new Audio("./assets/audio/jump.mp3"),
  die: new Audio("./assets/audio/die.mp3"),
  point: new Audio("./assets/audio/point.mp3"),
  maxPoints: new Audio("./assets/audio/maxpoints.wav"),
  maxPointsInGame: new Audio("./assets/audio/maxPointsInGame.mp3"),
  start: new Audio("./assets/audio/start.wav")
}

const playSound = (soundName) => {
  sounds[soundName].volume = "0.5"
  if (soundName === "maxPointsInGame") sounds[soundName].volume = "1"
  if (soundName === "start") sounds[soundName].volume = "0.3"
  sounds[soundName].play()
}