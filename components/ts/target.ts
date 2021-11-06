import * as PIXI from 'pixi.js'
import Config from './config'

export default class Target {
  protected x: number
  protected y: number
  protected target!: {
    hitPoint: PIXI.Graphics | null
    texture: PIXI.Graphics | null
  }

  protected stage: PIXI.Container
  protected time: number
  protected deathFlag: boolean = false
  public shotArr: PIXI.Graphics[]

  constructor(stage: PIXI.Container) {
    this.x = 0
    this.y = 0
    this.target = { hitPoint: null, texture: null }
    this.stage = stage
    this.time = 0
    this.shotArr = []
  }

  protected alpha(num: number) {
    this.target.hitPoint!.alpha = num
    this.target.texture!.alpha = num
  }

  // hitpoint color
  //          range
  // texture  color
  //          range
  protected createTarget(hc: number, hr: number, tc: number, tr: number) {
    this.target.hitPoint = new PIXI.Graphics()
    this.target.hitPoint.beginFill(hc, 1)
    this.target.hitPoint.drawCircle(0, 0, hr)
    this.target.hitPoint.endFill()
    this.target.hitPoint.x = this.x
    this.target.hitPoint.y = this.y

    // this.target.texture = new PIXI.Sprite(PIXI.Texture.fromImage(targetpic[0].src));
    this.target.texture = new PIXI.Graphics()
    this.target.texture.beginFill(tc, 1)
    this.target.texture.drawCircle(0, 0, tr)
    this.target.texture.endFill()

    this.target.texture.x = this.target.hitPoint.x
    this.target.texture.y = this.target.hitPoint.y

    this.stage.addChild(this.target.texture)
    this.stage.addChild(this.target.hitPoint)
  }

  protected moveTarget() {
    this.target.hitPoint!.x = this.x
    this.target.hitPoint!.y = this.y
    this.target.texture!.x = this.x
    this.target.texture!.y = this.y
  }

  protected shot(
    color: number,
    rad: number,
    x: number = this.x,
    y: number = this.y,
  ) {
    const shot = new PIXI.Graphics()
    shot.beginFill(color, 1)
    shot.drawCircle(0, 0, rad)
    shot.endFill()
    shot.x = x
    shot.y = y
    this.stage.addChild(shot)
    this.shotArr.push(shot)
  }

  protected outOfShot(i: number) {
    if (
      this.shotArr[i].y < -this.shotArr[i].height ||
      this.shotArr[i].y > Config.height + this.shotArr[i].height ||
      this.shotArr[i].x < -this.shotArr[i].width ||
      this.shotArr[i].x > Config.width + this.shotArr[i].width
    ) {
      this.shotDestroy(i)
    }
  }

  protected shotDestroyAll(arr: PIXI.Graphics[] = this.shotArr) {
    while (arr.length) {
      this.shotDestroy(0, arr)
    }
  }

  protected shotDestroy(i: number, arr: PIXI.Graphics[] = this.shotArr) {
    arr[i].destroy()
    arr.splice(i, 1)
  }

  protected hitTarget(arr: PIXI.Graphics[]) {
    let hitFlag = false

    if (!this.deathFlag) {
      for (let i = 0; i < arr.length; i++) {
        if (
          Math.sqrt(
            Math.pow(this.x - arr[i].x, 2) + Math.pow(this.y - arr[i].y, 2),
          ) <=
          (arr[i].width + this.target.hitPoint!.width) / 2
        ) {
          hitFlag = true
          break
        }
      }
    }

    return hitFlag
  }
}
