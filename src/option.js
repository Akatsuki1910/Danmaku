export default class Option {
	constructor(stage, text, text2, i) {
		this.stage = stage;
		this.textWidth = 240;
		this.textHeight = 50;
		this.textStyle = {
			fontFamily: 'Arial',
			fontSize: '40px',
			fill: 'white',
			fontWeight: 'bold'
		};
		this.textObj = {
			text: '',
			score: '',
		};
		this.textAdd(text, text2, i);
	}

	textAdd(text, text2, i) {
		this.textObj.text = new PIXI.Text(text, this.textStyle);
		this.textObj.text.y = this.textHeight * i;
		this.stage.addChild(this.textObj.text);

		this.textObj.score = new PIXI.Text(text2, this.textStyle);
		this.textObj.score.x = this.textWidth;
		this.textObj.score.y = this.textHeight * i;
		this.stage.addChild(this.textObj.score);
	}
}