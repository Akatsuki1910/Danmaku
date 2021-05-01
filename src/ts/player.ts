import * as PIXI from 'pixi.js'
import Target from './target'

export default class Player extends Target {
  moveSpeed: number
  slowMoveSpeed: number
  hitCount: number = 0
  constructor(stage: PIXI.Container, renderer: PIXI.AbstractRenderer) {
    super(stage, renderer)
    this.moveSpeed = 3
    this.slowMoveSpeed = this.moveSpeed / 2
    this.createTarget(0xff0000, 2, 0x00ff00, 5)
  }

  move(m: { x: number; y: number }, shift: boolean) {
    const s = shift ? this.slowMoveSpeed : this.moveSpeed
    this.x += s * m.x
    this.y += s * m.y
    this.moveTarget()
  }

  pushKey(key: string, shift: boolean) {
    switch (key) {
      case 'z':
        this.pShot()
        break
    }
  }

  pShot() {
    if (this.time % 5 === 0) {
      this.shot(0xff0000, 2)
    }
  }

  hit(arr: PIXI.Graphics[]) {
    const f = this.hitTarget(arr)
    if (f) {
      this.hitCount++
    }
  }

  animation(t: number) {
    this.time = t
    for (let i = 0; i < this.shotArr.length; i++) {
      this.shotArr[i].y -= 10
      this.shotDestroy(i)
    }
  }
}
