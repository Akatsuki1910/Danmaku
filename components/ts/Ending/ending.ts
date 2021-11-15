import * as PIXI from 'pixi.js'
import textAdd from '../option'
import SceneInit from '../sceneInit'
import StageManager from '../stageManager'

export default class Ending extends SceneInit {
  constructor(width: number, height: number) {
    super()

    const bg = new PIXI.Graphics()
    bg.beginFill(0xff00ff)
    bg.drawRect(0, 0, width, height)
    bg.endFill()
    this.stage.addChild(bg)

    const startObj = textAdd('TO START')
    this.stage.addChild(startObj)
    startObj.interactive = true
    startObj.on('mousedown', () => this.toTitleScene())
  }

  private toTitleScene() {
    StageManager.titleScene()
  }

  public animation(_time: number) {}
}
