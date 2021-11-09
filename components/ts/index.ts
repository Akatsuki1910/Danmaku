// import
import * as PIXI from 'pixi.js'
import { keyPush } from './keyConfig'
import {
  animation,
  getStageMaster,
  setStageMaster,
  titleScene,
} from './stageManager'

// default
export default class Danmaku {
  private renderer: PIXI.AbstractRenderer
  private time: number = 0
  private stageMaster: PIXI.Container

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

    setStageMaster(this.stageMaster)
    titleScene()

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

  public start() {
    this.animation()
  }

  private animation() {
    this.renderer.render(getStageMaster())
    animation(this.time)

    this.time++
    requestAnimationFrame(this.animation.bind(this))
  }
}
