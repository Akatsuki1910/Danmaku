import Player from './player'
import * as THREE from 'three'

const pressKeyArr = {
  Up: false,
  Left: false,
  Down: false,
  Right: false,
  Z: false,
  X: false,
  Shift: false,
}

export function keyPush(e: KeyboardEvent, keyPush: boolean) {
  if (e.code === 'ArrowUp') {
    pressKeyArr.Up = keyPush
  }
  if (e.code === 'ArrowLeft') {
    pressKeyArr.Left = keyPush
  }
  if (e.code === 'ArrowDown') {
    pressKeyArr.Down = keyPush
  }
  if (e.code === 'ArrowRight') {
    pressKeyArr.Right = keyPush
  }
  if (e.code === 'KeyZ') {
    pressKeyArr.Z = keyPush
  }
  if (e.code === 'KeyX') {
    pressKeyArr.X = keyPush
  }
  pressKeyArr.Shift = e.shiftKey
}

export function pressKey(player: Player) {
  const shift = pressKeyArr.Shift
  let x = 0
  let y = 0
  if (pressKeyArr.Up) {
    y -= 1
  }
  if (pressKeyArr.Left) {
    x -= 1
  }
  if (pressKeyArr.Down) {
    y += 1
  }
  if (pressKeyArr.Right) {
    x += 1
  }
  const m = new THREE.Vector2(x, y).normalize()
  const r = m.rotateAround(new THREE.Vector2(), 0)
  player.move({ x: r.x, y: r.y }, shift)

  if (pressKeyArr.Z) {
    player.pushKey('z', shift)
  }
  if (pressKeyArr.X) {
    player.pushKey('x', shift)
  }
}
