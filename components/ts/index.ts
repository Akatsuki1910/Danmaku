// import
import * as PIXI from 'pixi.js'
import { keyPush, pressKey, getPressKey } from './keyConfig'
import textAdd from './option'
import Config from './config'
import Enemy from './enemy'
import Player from './player'

// default
export default class Danmaku {
  private renderer: PIXI.AbstractRenderer
  private time: number = 0
  private titleStage: PIXI.Container | undefined
  private danmakuStage: PIXI.Container
  private enemy: Enemy | undefined
  private player: Player | undefined
  private gameStartFlg: boolean = false
  private bgStage: PIXI.Container
  private stage: PIXI.Container
  private hp: PIXI.Text
  private playerCount: PIXI.Text
  private optionStage: PIXI.Container
  private op: PIXI.Graphics
  private toggleEscape: boolean = false
  private pushEscape: boolean = false
  stageMaster: PIXI.Container

  constructor(ele: HTMLElement) {
    const width = window.innerWidth
    const height = window.innerHeight

    this.stageMaster = new PIXI.Container()
    this.renderer = PIXI.autoDetectRenderer({
      width,
      height,
      resolution: 1,
      antialias: true,
    })
    ele.appendChild(this.renderer.view)

    this.stage = new PIXI.Container()
    this.danmakuStage = new PIXI.Container()
    this.bgStage = new PIXI.Container()
    this.optionStage = new PIXI.Container()

    this.stage.addChild(this.bgStage)
    this.stage.addChild(this.danmakuStage)
    this.stage.addChild(this.optionStage)

    this.stageMaster.addChild(this.stage)

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

    this.op = new PIXI.Graphics()
    this.op.beginFill(0xff00ff)
    this.op.drawRect(0, 0, this.renderer.width, this.renderer.height)
    this.op.endFill()
    this.op.alpha = 0.8
    this.optionStage.addChild(this.op)
    this.optionStage.alpha = 0

    const btTitleObj = textAdd('back to title')
    this.optionStage.addChild(btTitleObj)
    btTitleObj.interactive = true
    btTitleObj.on('mousedown', () => this.backToTitle())

    this.createTitle()

    window.onresize = function () {
      location.reload()
    }

    window.onload = () => {
      document.body.addEventListener('keyup', (e) => {
        keyPush(e, false)
      })
      document.body.addEventListener('keydown', (e) => {
        keyPush(e, true)
      })
    }
  }

  private createTitle() {
    this.titleStage = new PIXI.Container()

    this.stageMaster.addChild(this.titleStage)

    const square = new PIXI.Graphics()
    square.beginFill(0xff00ff)
    square.drawRect(0, 0, this.renderer.width, this.renderer.height)
    square.endFill()
    this.titleStage!.addChild(square)

    const startObj = textAdd('START')
    this.titleStage!.addChild(startObj)
    startObj.interactive = true
    startObj.on('mousedown', () => this.gameStart())
  }

  private backToTitle() {
    this.stage.alpha = 0
    this.gameStartFlg = false
    this.toggleEscape = false
    this.pushEscape = false
    this.optionStage.alpha = 0
    this.createTitle()
  }

  private boadSetting() {
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

  private gameStart() {
    this.titleStage!.destroy(true)
    this.stageMaster.removeChild(this.titleStage!)
    this.titleStage = undefined

    this.stage.alpha = 1
    this.gameStartFlg = true
  }

  public start() {
    this.boadSetting()
    this.animation()
  }

  private animation() {
    this.renderer.render(this.stageMaster)
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
        this.player!.animation(this.time)
        this.enemy!.animation(this.time)
        this.player!.hit(this.enemy!.shotArr)
        this.enemy!.hit(this.player!.shotArr)

        this.hp.text = String(this.enemy!.getHP)
        this.playerCount.text = String(this.player!.playerCount)
      }
    }

    this.time++
    requestAnimationFrame(this.animation.bind(this))
  }
}
