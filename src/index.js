/*global PIXI: false */

// import
import './css/style.scss';
import Option from './option';
import Player from './player';
import Enemy from './enemy';
import {
  keyPush,
  pressKey
} from './keyConfig';

// default
const width = window.innerWidth;
const height = window.innerHeight;
const stage = new PIXI.Container();
const renderer = PIXI.autoDetectRenderer({
  width: width,
  height: height,
  resolution: 1,
  antialias: true,
  // transparent: true,
});
document.getElementById('pixiview').appendChild(renderer.view);
window.onresize = function () {
  location.reload();
};

// text object
const TO_enemyHP = new Option(stage, 'EHP', 0, 0);
const TO_time = new Option(stage, 'TIME', 0, 1);
const TO_graze = new Option(stage, 'GRAZE', 0, 2);
const TO_score = new Option(stage, 'SCORE', 0, 3);

const player = new Player(stage);
const enemy = new Enemy(stage);


window.onload = () => {
  document.body.addEventListener('keyup', {
    keyPush: false,
    handleEvent: keyPush
  });
  document.body.addEventListener('keydown', {
    keyPush: true,
    handleEvent: keyPush
  });
};

let time = 0;
(function animation() {
  renderer.render(stage);
  pressKey(player);
  player.animation(time);
  // cancelAnimationFrame(animation);
  time++;
  requestAnimationFrame(animation);
})();