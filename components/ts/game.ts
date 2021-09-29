// import
import * as PIXI from 'pixi.js'
import Config from './config'
import Enemy from './enemy'
import { pressKey } from './keyConfig'
import textAdd from './option'
import Player from './player'

// default
export default class Game {
  private danmakuStage: PIXI.Container
  public enemy: Enemy | undefined
  public player: Player | undefined
  private gameStart: boolean = false
  private renderer: PIXI.AbstractRenderer
  private bgStage: PIXI.Container
  private stage: PIXI.Container
  private hp: PIXI.Text
  private playerCount: PIXI.Text

  constructor(renderer: PIXI.AbstractRenderer) {
    this.renderer = renderer
    this.stage = new PIXI.Container()
    this.danmakuStage = new PIXI.Container()
    this.bgStage = new PIXI.Container()

    this.stage.addChild(this.bgStage)
    this.stage.addChild(this.danmakuStage)

    // bg
    const square2 = new PIXI.Graphics()
    square2.beginFill(0x7700ff)
    square2.drawRect(0, 0, this.renderer.width, this.renderer.height)
    square2.endFill()
    this.bgStage.addChild(square2)

    const hpText = textAdd('HP', Config.width, 0)
    this.bgStage.addChild(hpText)
    this.hp = textAdd(0, Config.width + 200, 0)
    this.bgStage.addChild(this.hp)
    const playerCountText = textAdd('COUNT', Config.width, 30)
    this.bgStage.addChild(playerCountText)
    this.playerCount = textAdd(0, Config.width + 200, 30)
    this.bgStage.addChild(this.playerCount)
  }

  public start() {
    this.gameStart = true
    const square = new PIXI.Graphics()
    square.beginFill(0xf0f000)
    square.drawRect(0, 0, Config.width, Config.height)
    square.endFill()
    this.danmakuStage.addChild(square)
    this.danmakuStage.mask = new PIXI.Graphics()
      .beginFill(0x000)
      .drawRect(0, 0, Config.width, Config.height)
      .endFill()

    this.enemy = new Enemy(this.danmakuStage)
    this.player = new Player(this.danmakuStage)
  }

  public animation(time: number) {
    this.renderer.render(this.stage)
    if (this.gameStart) {
      pressKey(this.player!)
      this.player!.animation(time)
      this.enemy!.animation(time)
      this.player!.hit(this.enemy!.shotArr)
      this.enemy!.hit(this.player!.shotArr)

      this.hp.text = String(this.enemy!.getHP)
      this.playerCount.text = String(this.player!.playerCount)
    }
  }
}
