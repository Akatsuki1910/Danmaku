import * as PIXI from 'pixi.js'
import Target from './target'

export default class Player extends Target {
  private moveSpeed: number
  private slowMoveSpeed: number
  private fpX: number
  private fpY: number
  public playerCount: number
  constructor(stage: PIXI.Container, renderer: PIXI.AbstractRenderer) {
    super(stage, renderer)
    this.moveSpeed = 3
    this.slowMoveSpeed = this.moveSpeed / 2
    this.createTarget(0xff0000, 2, 0x00ff00, 5)
    this.playerCount = 3

    this.fpX = renderer.width / 2
    this.fpY = renderer.height - 50

    this.x = this.fpX
    this.y = this.fpY
    this.moveTarget()
  }

  public move(m: { x: number; y: number }, shift: boolean) {
    const s = shift ? this.slowMoveSpeed : this.moveSpeed
    this.x += s * m.x
    this.y += s * m.y
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
    if (f) {
      this.playerCount--
      this.shotDestroyAll()
      this.shotDestroyAll(arr)
      this.x = this.fpX
      this.y = this.fpY
    }
  }

  public animation(t: number) {
    this.time = t
    for (let i = 0; i < this.shotArr.length; i++) {
      this.shotArr[i].y -= 10
      this.outOfShot(i)
    }
  }
}
