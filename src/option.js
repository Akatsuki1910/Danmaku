export default class Option {
	constructor(stage) {
		this.stage = stage;
		this.textWidth = 240;
		this.textHeight = 50;
		this.textStyle = {
			fontFamily: 'Arial',
			fontSize: '40px',
			fill: 'white',
			fontWeight: 'bold'
		};
	}

	textAdd(text, text2, i) {
		const textObj = {
			text: '',
			score: '',
		};
		textObj.text = new PIXI.Text(text, this.textStyle);
		textObj.text.y = this.textHeight * i;
		this.stage.addChild(textObj.text);

		textObj.score = new PIXI.Text(text2, this.textStyle);
		textObj.score.x = this.textWidth;
		textObj.score.y = this.textHeight * i;
		this.stage.addChild(textObj.score);
		return textObj;
	}
}