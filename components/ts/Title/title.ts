import * as PIXI from 'pixi.js'
import textAdd from '../option'
import SceneInit from '../sceneInit'
import StageManager from '../stageManager'

export default class Title extends SceneInit {
  constructor(width: number, height: number) {
    super()

    const bg = new PIXI.Graphics()
    bg.beginFill(0xff00ff)
    bg.drawRect(0, 0, width, height)
    bg.endFill()
    this.stage.addChild(bg)

    const startObj = textAdd('START')
    this.stage.addChild(startObj)
    startObj.interactive = true
    startObj.on('mousedown', () => this.toGameScene())

    const fragmentSrc = `
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;

    void main(void) {
      // テクスチャのピクセルデータ
      vec4 color = texture2D(uSampler, vTextureCoord);

      // 赤だけ定数にする
      color.r = 0.0;
      color.g = 1.0;
      color.b = 0.0;
      gl_FragColor = color;
    }
  `
    startObj.filters = [new PIXI.Filter(undefined, fragmentSrc, {})]

    const exitObj = textAdd('EXIT')
    this.stage.addChild(exitObj)
    exitObj.interactive = true
    exitObj.y = 40
    exitObj.on('mousedown', () => this.toExit())
  }

  private toGameScene() {
    StageManager.gameScene()
  }

  private toExit() {
    console.log('exit')
  }

  public animation(_time: number) {}
}
