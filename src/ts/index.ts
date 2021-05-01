// import
import * as PIXI from 'pixi.js'

import '../css/style.scss'
import Option from './option'
import Player from './player'
import Enemy from './enemy'
import { keyPush, pressKey } from './keyConfig'

// default
const width = 500 //window.innerWidth
const height = 500 //window.innerHeight
const stage = new PIXI.Container()
const renderer = PIXI.autoDetectRenderer({
  width: width,
  height: height,
  resolution: 1,
  antialias: true,
  // transparent: true,
})
document.body.appendChild(renderer.view)
window.onresize = function () {
  location.reload()
}

// text object
const TO_time = new Option(stage, 'TIME', 0, 0)
const TO_score = new Option(stage, 'SCORE', 0, 1)

const enemy = new Enemy(stage, renderer)
const player = new Player(stage, renderer)

window.onload = () => {
  document.body.addEventListener('keyup', (e) => {
    keyPush(e, false)
  })
  document.body.addEventListener('keydown', (e) => {
    keyPush(e, true)
  })
}

let time = 0
function animation() {
  renderer.render(stage)
  pressKey(player)
  player.animation(time)
  enemy.animation(time)
  player.hit(enemy.shotArr)
  enemy.hit(player.shotArr)

  TO_time.textSet(time)
  TO_score.textSet(player.hitCount)
  // cancelAnimationFrame(animation);
  time++
  requestAnimationFrame(animation)
}

animation()
