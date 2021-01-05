export default class Player {
	constructor(stage) {
		this.x = 0;
		this.y = 0;
		this.moveSpeed = 2;
		this.slowMoveSpeed = this.moveSpeed / 2;
		this.player = {
			hitPoint: '',
			texture: ''
		};
		this.stage = stage;
		this.shotArr = [];
		this.time = 0;
		this.createPlayer();
	}

	createPlayer() {
		this.player.hitPoint = new PIXI.Graphics();
		this.player.hitPoint.beginFill(0xff0000, 1);
		this.player.hitPoint.drawCircle(0, 0, 2);
		this.player.hitPoint.endFill();
		this.player.hitPoint.x = this.x;
		this.player.hitPoint.y = this.y;

		// this.player.texture = new PIXI.Sprite(PIXI.Texture.fromImage(playerpic[0].src));
		this.player.texture = new PIXI.Graphics();
		this.player.texture.beginFill(0x00ff00, 1);
		this.player.texture.drawCircle(0, 0, 20);
		this.player.texture.endFill();
		// this.player.texture.anchor.x = 0.5;
		// this.player.texture.anchor.y = 0.5;
		this.player.texture.x = this.player.hitPoint.x;
		this.player.texture.y = this.player.hitPoint.y;

		this.stage.addChild(this.player.texture);
		this.stage.addChild(this.player.hitPoint);
	}

	moveUp(shift) {
		this.y -= this.y * (shift) ? this.slowMoveSpeed : this.moveSpeed;
		this.movePlayer();
	}
	moveLeft(shift) {
		this.x -= this.x * (shift) ? this.slowMoveSpeed : this.moveSpeed;
		this.movePlayer();
	}
	moveDown(shift) {
		this.y += this.y * (shift) ? this.slowMoveSpeed : this.moveSpeed;
		this.movePlayer();
	}
	moveRight(shift) {
		this.x += this.x * (shift) ? this.slowMoveSpeed : this.moveSpeed;
		this.movePlayer();
	}

	movePlayer() {
		this.player.hitPoint.x = this.x;
		this.player.hitPoint.y = this.y;
		this.player.texture.x = this.x;
		this.player.texture.y = this.y;
	}

	pushKey(key, shift) {
		switch (key) {
			case 'z':
				this.shot();
				break;
		}
		console.log(key, shift);
	}

	shot() {
		if (this.time % 5 === 0) {
			const shot = new PIXI.Graphics();
			shot.beginFill(0xff0000, 1);
			shot.drawCircle(0, 0, 2);
			shot.endFill();
			shot.x = this.x;
			shot.y = this.y;
			this.stage.addChild(shot);
			this.shotArr.push(shot);
		}
	}

	animation(t) {
		this.time = t;
		for (const i in this.shotArr) {
			this.shotArr[i].y -= 3;
			if (this.shotArr[i].y === 0) {
				this.shotArr[i].destroy();
				this.shotArr.splice(i, 1);
			}
		}
	}
}