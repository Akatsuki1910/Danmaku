// import
import * as PIXI from 'pixi.js'
import Config from '../config'
import { getPressKey, pressKey } from '../keyConfig'
import textAdd from '../option'
import StageManager from '../stageManager'
import Enemy from '../Target/enemy'
import Player from '../Target/player'

export default class Game {
  bgStage: PIXI.Container
  optionStage: PIXI.Container
  hp: PIXI.Text
  playerCount: PIXI.Text
  op: PIXI.Graphics
  danmakuStage: PIXI.Container | undefined
  stage: PIXI.Container
  enemy: Enemy
  player: Player
  private gameStartFlg: boolean = true
  private toggleEscape: boolean = false
  private pushEscape: boolean = false
  constructor(width: number, height: number) {
    this.bgStage = new PIXI.Container()
    this.bgStage.zIndex = 1
    this.optionStage = new PIXI.Container()
    this.optionStage.zIndex = 999

    // bg
    const square2 = new PIXI.Graphics()
    square2.beginFill(0x7700ff)
    square2.drawRect(0, 0, width, height)
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

    this.op = new PIXI.Graphics()
    this.op.beginFill(0xff00ff)
    this.op.drawRect(0, 0, width, height)
    this.op.endFill()
    this.op.alpha = 0.8
    this.optionStage.addChild(this.op)
    this.optionStage.alpha = 0

    const btTitleObj = textAdd('back to title')
    this.optionStage.addChild(btTitleObj)
    btTitleObj.interactive = true
    btTitleObj.on('mousedown', () => this.backToTitle())

    this.danmakuStage = new PIXI.Container()
    this.danmakuStage.zIndex = 2

    this.stage = new PIXI.Container()
    this.stage.sortableChildren = true
    this.stage.addChild(this.danmakuStage)
    this.stage.addChild(this.optionStage)
    this.stage.addChild(this.bgStage)
    this.stage.sortChildren()

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

  backToTitle(): void {
    StageManager.titleScene()
  }

  animation(time: number) {
    if (this.gameStartFlg) {
      if (getPressKey().Escape && !this.pushEscape) {
        this.pushEscape = true
        this.toggleEscape = !this.toggleEscape

        this.optionStage.alpha = this.toggleEscape ? 1 : 0
      } else if (!getPressKey().Escape) {
        this.pushEscape = false
      }

      if (!this.toggleEscape) {
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
}
