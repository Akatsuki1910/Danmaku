import * as PIXI from 'pixi.js'

export default class Player {
  x: number
  y: number
  moveSpeed: number
  slowMoveSpeed: number
  player: { hitPoint: PIXI.Graphics; texture: PIXI.Graphics }
  stage: any
  shotArr: PIXI.Graphics[]
  time: number
  constructor(stage: PIXI.Container) {
    this.x = 0
    this.y = 0
    this.moveSpeed = 5
    this.slowMoveSpeed = this.moveSpeed / 2
    this.player = { hitPoint: null, texture: null }
    this.stage = stage
    this.shotArr = []
    this.time = 0
    this.createPlayer()
  }

  createPlayer() {
    this.player.hitPoint = new PIXI.Graphics()
    this.player.hitPoint.beginFill(0xff0000, 1)
    this.player.hitPoint.drawCircle(0, 0, 2)
    this.player.hitPoint.endFill()
    this.player.hitPoint.x = this.x
    this.player.hitPoint.y = this.y

    // this.player.texture = new PIXI.Sprite(PIXI.Texture.fromImage(playerpic[0].src));
    this.player.texture = new PIXI.Graphics()
    this.player.texture.beginFill(0x00ff00, 1)
    this.player.texture.drawCircle(0, 0, 20)
    this.player.texture.endFill()
    // this.player.texture.anchor.x = 0.5;
    // this.player.texture.anchor.y = 0.5;
    this.player.texture.x = this.player.hitPoint.x
    this.player.texture.y = this.player.hitPoint.y

    this.stage.addChild(this.player.texture)
    this.stage.addChild(this.player.hitPoint)
  }

  moveUp(shift: boolean) {
    this.y -= shift ? this.slowMoveSpeed : this.moveSpeed
    this.movePlayer()
  }
  moveLeft(shift: boolean) {
    this.x -= shift ? this.slowMoveSpeed : this.moveSpeed
    this.movePlayer()
  }
  moveDown(shift: boolean) {
    this.y += shift ? this.slowMoveSpeed : this.moveSpeed
    this.movePlayer()
  }
  moveRight(shift: boolean) {
    this.x += shift ? this.slowMoveSpeed : this.moveSpeed
    this.movePlayer()
  }

  movePlayer() {
    this.player.hitPoint.x = this.x
    this.player.hitPoint.y = this.y
    this.player.texture.x = this.x
    this.player.texture.y = this.y
  }

  pushKey(key: string, shift: boolean) {
    switch (key) {
      case 'z':
        this.shot()
        break
    }
  }

  shot() {
    if (this.time % 5 === 0) {
      const shot = new PIXI.Graphics()
      shot.beginFill(0xff0000, 1)
      shot.drawCircle(0, 0, 2)
      shot.endFill()
      shot.x = this.x
      shot.y = this.y
      this.stage.addChild(shot)
      this.shotArr.push(shot)
    }
  }

  animation(t: number) {
    this.time = t
    for (let i = 0; i < this.shotArr.length; i++) {
      this.shotArr[i].y -= 10
      if (this.shotArr[i].y === 0) {
        this.shotArr[i].destroy()
        this.shotArr.splice(i, 1)
      }
    }
  }
}
