import * as THREE from 'three'
import Player from './player'

const pressKeyArr: { [key: string]: boolean } = {
  ArrowUp: false,
  ArrowLeft: false,
  ArrowDown: false,
  ArrowRight: false,
  KeyZ: false,
  KeyX: false,
  Shift: false,
}

export function keyPush(e: KeyboardEvent, keyPush: boolean) {
  pressKeyArr[e.code] = keyPush
  pressKeyArr.Shift = e.shiftKey
}

export function pressKey(player: Player) {
  const shift = pressKeyArr.Shift
  let x = 0
  let y = 0
  if (pressKeyArr.ArrowUp) {
    y -= 1
  }
  if (pressKeyArr.ArrowLeft) {
    x -= 1
  }
  if (pressKeyArr.ArrowDown) {
    y += 1
  }
  if (pressKeyArr.ArrowRight) {
    x += 1
  }
  const m = new THREE.Vector2(x, y).normalize()
  const r = m.rotateAround(new THREE.Vector2(), 0)
  player.move({ x: r.x, y: r.y }, shift)

  if (pressKeyArr.KeyZ) {
    player.pushKey('z', shift)
  }
  if (pressKeyArr.KeyX) {
    player.pushKey('x', shift)
  }
}
