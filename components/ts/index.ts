// import
import * as PIXI from 'pixi.js'
import KeyConfig from './keyConfig'
import StageManager from './stageManager'

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

    StageManager.setStageMaster(this.stageMaster)
    StageManager.titleScene()

    window.onresize = function () {
      location.reload()
    }

    window.onload = () => {
      document.body.addEventListener('keyup', (e) => {
        KeyConfig.keyPush(e, false)
      })
      document.body.addEventListener('keydown', (e) => {
        KeyConfig.keyPush(e, true)
      })
    }
  }

  public start() {
    this.animation()
  }

  private animation() {
    this.renderer.render(StageManager.getStageMaster())
    StageManager.animation(this.time)

    this.time++
    requestAnimationFrame(this.animation.bind(this))
  }
}
