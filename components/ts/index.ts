// import
import * as PIXI from 'pixi.js'
import Player from './player'
import Enemy from './enemy'
import { keyPush, pressKey } from './keyConfig'

// default
export default class Danmaku {
  private stage: PIXI.Container
  private renderer: PIXI.AbstractRenderer
  private enemy: Enemy
  private player: Player
  private time: number

  constructor(ele: HTMLElement) {
    const width = 200 // window.innerWidth
    const height = 200 // window.innerHeight
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

  get getTime() {
    return this.time
  }

  get getHP() {
    return this.enemy.getHP
  }

  get getPlayerCount() {
    return this.player.playerCount
  }

  public start() {
    this.animation()
  }

  private animation() {
    this.renderer.render(this.stage)
    pressKey(this.player)
    this.player.animation(this.time)
    this.enemy.animation(this.time)
    this.player.hit(this.enemy.shotArr)
    this.enemy.hit(this.player.shotArr)

    this.time++
    requestAnimationFrame(this.animation.bind(this))
  }
}
