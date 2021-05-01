import * as PIXI from 'pixi.js'

export default class Target {
  x: number
  y: number
  target: { hitPoint: PIXI.Graphics; texture: PIXI.Graphics }
  stage: PIXI.Container
  renderer: PIXI.AbstractRenderer
  shotArr: PIXI.Graphics[]
  time: number
  constructor(stage: PIXI.Container, renderer: PIXI.AbstractRenderer) {
    this.x = 0
    this.y = 0
    this.target = { hitPoint: null, texture: null }
    this.stage = stage
    this.renderer = renderer
    this.shotArr = []
    this.time = 0
  }

  // hitpoint color
  //          range
  // texture  color
  //          range
  createTarget(hc: number, hr: number, tc: number, tr: number) {
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

  moveTarget() {
    this.target.hitPoint.x = this.x
    this.target.hitPoint.y = this.y
    this.target.texture.x = this.x
    this.target.texture.y = this.y
  }

  shot(color: number, rad: number, x: number = this.x, y: number = this.y) {
    const shot = new PIXI.Graphics()
    shot.beginFill(color, 1)
    shot.drawCircle(0, 0, rad)
    shot.endFill()
    shot.x = x
    shot.y = y
    this.stage.addChild(shot)
    this.shotArr.push(shot)
  }

  shotDestroy(i: number) {
    if (
      this.shotArr[i].y < 0 ||
      this.shotArr[i].y > this.renderer.height ||
      this.shotArr[i].x < 0 ||
      this.shotArr[i].x > this.renderer.width
    ) {
      this.shotArr[i].destroy()
      this.shotArr.splice(i, 1)
    }
  }

  hitTarget(arr: PIXI.Graphics[]) {
    let hitFlag = false
    for (let i = 0; i < arr.length; i++) {
      if (
        Math.sqrt(
          Math.pow(this.x - arr[i].x, 2) + Math.pow(this.y - arr[i].y, 2)
        ) <=
        (arr[i].width + this.target.hitPoint.width) / 2
      ) {
        hitFlag = true
        break
      }
    }

    return hitFlag
  }
}
