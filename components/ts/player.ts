import * as PIXI from 'pixi.js'
import Config from './config'
import Target from './target'

export default class Player extends Target {
  private moveSpeed: number
  private slowMoveSpeed: number
  private fpX: number
  private fpY: number
  private stealth: boolean
  public playerCount: number

  constructor(stage: PIXI.Container) {
    super(stage)
    this.moveSpeed = 3
    this.slowMoveSpeed = this.moveSpeed / 2
    this.createTarget(0xff0000, 2, 0x00ff00, 5)
    this.playerCount = 3
    this.stealth = true

    this.fpX = Config.width / 2
    this.fpY = Config.height - 50

    this.x = this.fpX
    this.y = this.fpY
    this.moveTarget()
  }

  public move(m: { x: number; y: number }, shift: boolean) {
    const s = shift ? this.slowMoveSpeed : this.moveSpeed
    this.x += s * m.x
    this.y += s * m.y
    this.x = this.x > 0 ? (Config.width > this.x ? this.x : Config.width) : 0
    this.y = this.y > 0 ? (Config.height > this.y ? this.y : Config.height) : 0
    this.moveTarget()
  }

  public pushKey(key: string, _shift: boolean) {
    switch (key) {
      case 'z':
        this.pShot()
        break
    }
  }

  private pShot() {
    if (this.time % 5 === 0) {
      this.shot(0xff0000, 2)
    }
  }

  public hit(arr: PIXI.Graphics[]) {
    const f = this.hitTarget(arr)
    if (this.stealth) {
      if (f) {
        this.playerCount--
        this.shotDestroyAll()
        this.shotDestroyAll(arr)

        this.stealth = false
        this.x = this.fpX
        this.y = this.fpY
        this.target.texture!.alpha = 0
        this.destroyed()
      }
    }
  }

  public destroyed() {
    const step = 0.1
    let time = 0
    const id = setInterval(() => {
      const x = (time + Math.sin(4 * time)) / 4
      if (x > 1) {
        this.alpha(1)
        this.stealth = true
        clearInterval(id)
      } else {
        this.alpha(x)
        time += step
      }
    }, 50)
  }

  public animation(t: number) {
    this.time = t
    for (let i = 0; i < this.shotArr.length; i++) {
      this.shotArr[i].y -= 10
      this.outOfShot(i)
    }
  }
}
