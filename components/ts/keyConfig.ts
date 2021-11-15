import * as THREE from 'three'
import Player from './Target/player'

export default class KeyConfig {
  private static readonly pressKeyArr: { [key: string]: boolean } = {
    ArrowUp: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowRight: false,
    KeyA: false,
    KeyB: false,
    KeyC: false,
    KeyD: false,
    KeyE: false,
    KeyF: false,
    KeyG: false,
    KeyH: false,
    KeyI: false,
    KeyJ: false,
    KeyK: false,
    KeyL: false,
    KeyM: false,
    KeyN: false,
    KeyO: false,
    KeyP: false,
    KeyQ: false,
    KeyR: false,
    KeyS: false,
    KeyT: false,
    KeyU: false,
    KeyV: false,
    KeyW: false,
    KeyX: false,
    KeyY: false,
    KeyZ: false,
    ShiftLeft: false,
    Escape: false,
  }

  static getPressKey() {
    return this.pressKeyArr
  }

  static keyPush(e: KeyboardEvent, keyPush: boolean) {
    this.pressKeyArr[e.code] = keyPush
  }

  static pressKey(player: Player) {
    const shift = this.pressKeyArr.ShiftLeft
    let x = 0
    let y = 0
    if (this.pressKeyArr.ArrowUp) {
      y -= 1
    }
    if (this.pressKeyArr.ArrowLeft) {
      x -= 1
    }
    if (this.pressKeyArr.ArrowDown) {
      y += 1
    }
    if (this.pressKeyArr.ArrowRight) {
      x += 1
    }
    const m = new THREE.Vector2(x, y).normalize()
    const r = m.rotateAround(new THREE.Vector2(), 0)
    player.move({ x: r.x, y: r.y }, shift)

    if (this.pressKeyArr.KeyZ) {
      player.pushKey('z', shift)
    }
  }
}
