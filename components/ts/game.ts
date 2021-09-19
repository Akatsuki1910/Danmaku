// import
import * as PIXI from 'pixi.js'
import Player from './player'
import Enemy from './enemy'
import { pressKey } from './keyConfig'

// default
export default class Game {
  private stage: PIXI.Container
  public enemy: Enemy | undefined
  public player: Player | undefined
  private gameStart: boolean = false

  constructor(stage: PIXI.Container) {
    this.stage = stage
  }

  public start() {
    this.gameStart = true
    this.enemy = new Enemy(this.stage)
    this.player = new Player(this.stage)
  }

  public animation(time: number) {
    if (this.gameStart) {
      pressKey(this.player!)
      this.player!.animation(time)
      this.enemy!.animation(time)
      this.player!.hit(this.enemy!.shotArr)
      this.enemy!.hit(this.player!.shotArr)
    }
  }
}
