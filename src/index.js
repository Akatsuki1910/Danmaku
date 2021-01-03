import "./css/style.scss";

//don't move
var width = window.innerWidth;
var height = window.innerHeight;
var x = width / 2;
var y = height / 2;
var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer({
  width: width, 
  height: height,
  resolution: 1,
  antialias: true,
  transparent: true,
});
document.getElementById("pixiview").appendChild(renderer.view);
window.onresize = function () {
  location.reload();
};
var player = [];
var enemy = [];
var enemyhp;

import "./option.js";

import "./effect.js";
import "./enemy.js";
import "./loading.js";
import "./main.js";
import "./player.js";
import "./start.js";
import "./title.js";
