const pressKeyArr = {
	'Up': false,
	'Left': false,
	'Down': false,
	'Right': false,
	'Z': false,
	'X': false,
	'Shift': false
};

export function keyPush(e) {
	if (e.code === 'ArrowUp') {
		pressKeyArr.Up = this.keyPush;
	}
	if (e.code === 'ArrowLeft') {
		pressKeyArr.Left = this.keyPush;
	}
	if (e.code === 'ArrowDown') {
		pressKeyArr.Down = this.keyPush;
	}
	if (e.code === 'ArrowRight') {
		pressKeyArr.Right = this.keyPush;
	}
	if (e.code === 'KeyZ') {
		pressKeyArr.Z = this.keyPush;
	}
	if (e.code === 'KeyX') {
		pressKeyArr.X = this.keyPush;
	}
	pressKeyArr.Shift = e.shiftKey;
}

export function pressKey(player) {
	const shift = pressKeyArr.Shift;
	if (pressKeyArr.Up) {
		player.moveUp(shift);
	}
	if (pressKeyArr.Left) {
		player.moveLeft(shift);
	}
	if (pressKeyArr.Down) {
		player.moveDown(shift);
	}
	if (pressKeyArr.Right) {
		player.moveRight(shift);
	}
	if (pressKeyArr.Z) {
		player.pushKey('z', shift);
	}
	if (pressKeyArr.X) {
		player.pushKey('x', shift);
	}
}