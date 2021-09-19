// import
import * as PIXI from 'pixi.js'
import { keyPush } from './keyConfig'
import Game from './game'
import Option from './option'

// default
export default class Danmaku {
  private stage: PIXI.Container
  private renderer: PIXI.AbstractRenderer
  private time: number
  private game: Game
  private startObj!: Option

  constructor(ele: HTMLElement) {
    const width = window.innerWidth
    const height = window.innerHeight
    this.stage = new PIXI.Container()
    this.renderer = PIXI.autoDetectRenderer({
      width,
      height,
      resolution: 1,
      antialias: true,
      // transparent: true,
    })
    ele.appendChild(this.renderer.view)

    this.game = new Game(this.stage)

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
    this.startObj = new Option(this.stage, 'start')
    this.startObj.textObj!.interactive = true
    this.startObj.textObj!.on('mousedown', () => this.gameStart())
  }

  private gameStart() {
    this.startObj.textObj!.destroy()
    this.game.start()
  }

  public start() {
    this.title()
    this.animation()
  }

  private animation() {
    this.renderer.render(this.stage)

    this.game.animation(this.time)

    this.time++
    requestAnimationFrame(this.animation.bind(this))
  }
}
