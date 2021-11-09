import * as PIXI from 'pixi.js'
import Game from './Danmaku/game'
import Title from './Title/title'

let stage: PIXI.Container
let stageMaster: PIXI.Container
let instance: any

export function setStageMaster(stage: PIXI.Container) {
  stageMaster = stage
}

export function getStageMaster() {
  return stageMaster
}

export function titleScene() {
  sceneChangeInit()
  instance = new Title(window.innerWidth, window.innerHeight)
  stage = instance.stage
  stageMaster.addChild(stage)
}

export function gameScene() {
  sceneChangeInit()
  instance = new Game(window.innerWidth, window.innerHeight)
  stage = instance.stage
  stageMaster.addChild(stage)
}

function sceneChangeInit() {
  stage?.destroy(true)
  stageMaster.removeChild(stage)
}

export function animation(time: number) {
  instance?.animation(time)
}
