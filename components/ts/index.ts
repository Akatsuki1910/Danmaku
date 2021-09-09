// import
import * as PIXI from 'pixi.js'
import Option from './option'
import Player from './player'
import Enemy from './enemy'
import { keyPush, pressKey } from './keyConfig'

// default
export default class Danmaku {
  private stage: PIXI.Container
  private renderer: PIXI.AbstractRenderer
  private toTime: Option
  private toScore: Option
  private enemy: Enemy
  private player: Player
  private time: number

  constructor(ele: HTMLElement) {
    const width = 500 // window.innerWidth
    const height = 500 // window.innerHeight
    this.stage = new PIXI.Container()
    this.renderer = PIXI.autoDetectRenderer({
      width,
      height,
      resolution: 1,
      antialias: true,
      // transparent: true,
    })
    ele.appendChild(this.renderer.view)
    window.onresize = function () {
      location.reload()
    }

    // text object
    this.toTime = new Option(this.stage, 'TIME', 0, 0)
    this.toScore = new Option(this.stage, 'SCORE', 0, 1)

    this.enemy = new Enemy(this.stage, this.renderer)
    this.player = new Player(this.stage, this.renderer)

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

  public start() {
    this.animation()
  }

  public get dTime() {
    return this.time
  }

  private animation() {
    this.renderer.render(this.stage)
    pressKey(this.player)
    this.player.animation(this.time)
    this.enemy.animation(this.time)
    this.player.hit(this.enemy.shotArr)
    this.enemy.hit(this.player.shotArr)

    this.toTime.textSet(this.time)
    this.toScore.textSet(this.player.hitCount)
    this.time++
    requestAnimationFrame(this.animation.bind(this))
  }
}
