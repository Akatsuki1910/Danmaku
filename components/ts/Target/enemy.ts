import * as PIXI from 'pixi.js'
import Config from '../config'
import Target from './target'

export default class Enemy extends Target {
  private hp: number

  constructor(stage: PIXI.Container) {
    super(stage)
    this.createTarget(0xff0000, 10, 0x0000ff, 20)

    this.x = Config.width / 2
    this.y = 50
    this.moveTarget()

    this.hp = 10
  }

  get getHP() {
    return this.hp
  }

  get getDeathFlag() {
    return this.deathFlag
  }

  public move(angle: number) {
    this.x = Math.sin(angle - Math.PI / 2)
    this.y = Math.cos(angle - Math.PI / 2)
    this.moveTarget()
  }

  public hit(arr: PIXI.Graphics[]) {
    const f = this.hitTarget(arr)
    if (f) {
      this.hp--
    }

    if (this.hp <= 0) {
      this.hp = 0
      this.death()
    }
  }

  private death() {
    this.stage.removeChild(this.target.hitPoint!)
    this.stage.removeChild(this.target.texture!)
    // this.target.hitPoint!.destroy()
    // this.target.texture!.destroy()
    this.deathFlag = true
    this.shotDestroyAll()
  }

  public animation(t: number) {
    this.time = t
    if (Math.random() < 0.1) {
      this.shot(0x00ffff, 2)
    }
    for (let i = 0; i < this.shotArr.length; i++) {
      this.shotArr[i].y += 2
      this.outOfShot(i)
    }
  }
}
