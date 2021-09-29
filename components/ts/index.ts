// import
import * as PIXI from 'pixi.js'
import Game from './game'
import { keyPush } from './keyConfig'
import textAdd from './option'

// default
export default class Danmaku {
  private renderer: PIXI.AbstractRenderer
  private time: number
  private game: Game
  private titleStage: PIXI.Container | null

  constructor(ele: HTMLElement) {
    const width = window.innerWidth
    const height = window.innerHeight

    this.titleStage = new PIXI.Container()
    this.renderer = PIXI.autoDetectRenderer({
      width,
      height,
      resolution: 1,
      antialias: true,
    })
    ele.appendChild(this.renderer.view)

    this.game = new Game(this.renderer)

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

    this.time = 0
  }

  private title() {
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

  private gameStart() {
    this.titleStage!.destroy(true)
    this.titleStage = null
    this.game.start()
  }

  public start() {
    this.title()
    this.animation()
  }

  private animation() {
    this.game.animation(this.time)
    if (this.titleStage) {
      this.renderer.render(this.titleStage)
    }
    this.time++
    requestAnimationFrame(this.animation.bind(this))
  }
}
