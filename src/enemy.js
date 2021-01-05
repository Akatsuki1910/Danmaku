export default class Enemy{
	constructor(stage){
		this.x = 0;
		this.y = 0;
		this.enemy = {
			hitPoint: '',
			texture: ''
		};
		this.stage = stage;
		this.createEnemy();
	}

	createEnemy(){
    this.enemy.hitPoint = new PIXI.Graphics();
    this.enemy.hitPoint.beginFill(0xf00, 1);
    this.enemy.hitPoint.drawCircle(0, 0, 2);
		this.enemy.hitPoint.endFill();
		this.enemy.hitPoint.x = this.x;
		this.enemy.hitPoint.y = this.y;

		// this.enemy.texture = new PIXI.Sprite(PIXI.Texture.fromImage(enemypic[0].src));
		this.enemy.texture = new PIXI.Graphics();
    this.enemy.texture.beginFill(0x0f0, 1);
    this.enemy.texture.drawCircle(0, 0, 20);
		this.enemy.texture.endFill();
    // this.enemy.texture.anchor.x = 0.5;
    // this.enemy.texture.anchor.y = 0.5;
    this.enemy.texture.x = this.enemy.hitPoint.x;
		this.enemy.texture.y = this.enemy.hitPoint.y;
		
		this.stage.addChild(this.enemy.texture);
		this.stage.addChild(this.enemy.hitPoint);
	}
}