import * as PIXI from 'pixi.js'

export default class Option {
  private stage: PIXI.Container
  private textStyle: PIXI.TextStyle
  public textObj!: PIXI.Text
  constructor(
    stage: PIXI.Container,
    text: string,
    x: number = 0,
    y: number = 0,
  ) {
    this.stage = stage
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: '40px',
      fill: 'white',
      fontWeight: 'bold',
    })
    this.textAdd(text, x, y)
  }

  private textAdd(text: string, x: number, y: number) {
    this.textObj! = new PIXI.Text(text, this.textStyle)
    this.textObj!.x = x
    this.textObj!.y = y
    this.stage.addChild(this.textObj)
  }

  public textSet(text: string | number) {
    this.textObj!.text = String(text)
  }
}
