/*global PIXI: false */

import './css/style.scss';
import Option from './option';

const width = window.innerWidth;
const height = window.innerHeight;
const stage = new PIXI.Container();
const renderer = PIXI.autoDetectRenderer({
  width: width, 
  height: height,
  resolution: 1,
  antialias: true,
  transparent: true,
});
document.getElementById('pixiview').appendChild(renderer.view);
window.onresize = function () {
  location.reload();
};

const enemyHP = new Option('敵HP');

(function animation() {
	renderer.render(stage);
		cancelAnimationFrame(animation);
		requestAnimationFrame(animation);
})();