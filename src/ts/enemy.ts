import * as PIXI from 'pixi.js'
import Target from './target'

export default class Enemy extends Target {
  constructor(stage: PIXI.Container, renderer: PIXI.AbstractRenderer) {
    super(stage, renderer)
    this.createTarget(0xff0000, 2, 0x0000ff, 20)

    this.x = renderer.width / 2
    this.y = 50
    this.moveTarget()
  }

  move(angle: number) {
    this.x = Math.sin(angle - Math.PI / 2)
    this.y = Math.cos(angle - Math.PI / 2)
    this.moveTarget()
  }

  hit(arr: PIXI.Graphics[]) {
    const f = this.hitTarget(arr)
  }

  animation(t: number) {
    this.time = t
    if (Math.random() < 0.1) {
      this.shot(0x00ffff, 2)
    }
    for (let i = 0; i < this.shotArr.length; i++) {
      this.shotArr[i].y += 5
      this.shotDestroy(i)
    }
  }
}
