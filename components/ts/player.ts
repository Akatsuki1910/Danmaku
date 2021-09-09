import * as PIXI from 'pixi.js'
import Target from './target'

export default class Player extends Target {
  private moveSpeed: number
  private slowMoveSpeed: number
  public hitCount: number = 0
  constructor(stage: PIXI.Container, renderer: PIXI.AbstractRenderer) {
    super(stage, renderer)
    this.moveSpeed = 3
    this.slowMoveSpeed = this.moveSpeed / 2
    this.createTarget(0xff0000, 2, 0x00ff00, 5)
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
      this.hitCount++
    }
  }

  public animation(t: number) {
    this.time = t
    for (let i = 0; i < this.shotArr.length; i++) {
      this.shotArr[i].y -= 10
      this.shotDestroy(i)
    }
  }
}
