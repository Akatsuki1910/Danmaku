import * as PIXI from 'pixi.js'
import textAdd from '../option'
import StageManager from '../stageManager'

export default class Ending {
  stage: PIXI.Container
  constructor(width: number, height: number) {
    this.stage = new PIXI.Container()

    const square = new PIXI.Graphics()
    square.beginFill(0xff00ff)
    square.drawRect(0, 0, width, height)
    square.endFill()
    this.stage!.addChild(square)

    const startObj = textAdd('TO START')
    this.stage!.addChild(startObj)
    startObj.interactive = true
    startObj.on('mousedown', () => this.gameStart())
  }

  gameStart() {
    StageManager.titleScene()
  }

  animation(_time: number) {}
}
