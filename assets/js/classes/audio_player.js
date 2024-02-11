class AudioPlayer {
  sfx = {}
  
  constructor (sfx) {
    sfx.forEach((audio) => {
      const sound = new Audio(`./assets/audio/${audio.audio}`)
      sound.volume = audio.volume ? audio.volume : 0.5
      this.sfx[audio.name] = sound
    })
  }

  play(audio) {
    this.sfx[audio].play()
  }
}

const game_sounds = [
  {
    audio: "jump.mp3",
    name: "jump",
  },
  {
    audio: "die.mp3",
    name: "die",
  },
  {
    audio: "point.mp3",
    name: "point"
  },
  {
    audio: "maxpoints.wav",
    name: "maxPoints"
  },
  {
    audio: "maxPointsInGame.mp3",
    name: "maxPointsInGame",
    volume: 1
  },
  {
    audio: "start.wav",
    name: "start",
    volume: 0.3
  }
]