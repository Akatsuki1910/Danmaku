import * as PIXI from 'pixi.js'

export default class Option {
  stage: any
  textWidth: number
  textHeight: number
  textStyle: PIXI.TextStyle
  textObj: { text: PIXI.Text | null; score: PIXI.Text | null }
  constructor(stage: PIXI.Container, text: string, text2: number, i: number) {
    this.stage = stage
    this.textWidth = 240
    this.textHeight = 50
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: '40px',
      fill: 'white',
      fontWeight: 'bold',
    })
    this.textObj = { text: null, score: null }
    this.textAdd(text, text2, i)
  }

  textAdd(text: string, text2: number, i: number) {
    this.textObj.text! = new PIXI.Text(text, this.textStyle)
    this.textObj.text!.y = this.textHeight * i
    this.stage.addChild(this.textObj.text)

    this.textObj.score! = new PIXI.Text(String(text2), this.textStyle)
    this.textObj.score!.x = this.textWidth
    this.textObj.score!.y = this.textHeight * i
    this.stage.addChild(this.textObj.score)
  }

  textSet(text: string | number) {
    this.textObj.score!.text = String(text)
  }
}
