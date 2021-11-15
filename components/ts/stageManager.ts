import * as PIXI from 'pixi.js'
import Game from './Danmaku/game'
import Ending from './Ending/ending'
import SceneInit from './sceneInit'
import Title from './Title/title'

export default class StageManager {
  private static stage: PIXI.Container | undefined
  private static stageMaster: PIXI.Container | undefined
  private static instance: SceneInit

  static setStageMaster(stage: PIXI.Container) {
    this.stageMaster = stage
  }

  static getStageMaster() {
    return this.stageMaster!
  }

  static titleScene() {
    this.sceneChangeInit()
    this.instance = new Title(window.innerWidth, window.innerHeight)
    this.stage = this.instance.stage
    this.stageMaster?.addChild(this.stage!)
  }

  static gameScene() {
    this.sceneChangeInit()
    this.instance = new Game(window.innerWidth, window.innerHeight)
    this.stage = this.instance.stage
    this.stageMaster?.addChild(this.stage!)
  }

  static endingScene() {
    this.sceneChangeInit()
    this.instance = new Ending(window.innerWidth, window.innerHeight)
    this.stage = this.instance.stage
    this.stageMaster?.addChild(this.stage!)
  }

  static sceneChangeInit() {
    this.stage?.destroy(true)
    this.stageMaster?.removeChild(this.stage!)
  }

  static animation(time: number) {
    this.instance?.animation(time)
  }
}
