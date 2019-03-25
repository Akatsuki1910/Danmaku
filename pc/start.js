/*jshint esversion: 6 */
var button = [];
var level = ["EASY","NOMAL","HARD","LUNATIC"];
var arrow = ["↑","←","→","↓"];
button[0] = new PIXI.Text(level[0],{fontFamily : 'Arial',fontSize : '50px', fill : 0xffffff});
button[0].anchor.x = 0.5;
button[0].anchor.y = 0.5;
button[0].position.x = x;
button[0].position.y = y-70;
button[1] = new PIXI.Text(level[1],{fontFamily : 'Arial',fontSize : '40px', fill : 0xffffff});
button[1].anchor.x = 0.5;
button[1].anchor.y = 0.5;
button[1].position.x = x-150;
button[1].position.y = y;
button[2] = new PIXI.Text(level[2],{fontFamily : 'Arial',fontSize : '40px', fill : 0xffffff});
button[2].anchor.x = 0.5;
button[2].anchor.y = 0.5;
button[2].position.x = x+150;
button[2].position.y = y;
button[3] = new PIXI.Text(level[3],{fontFamily : 'Arial',fontSize : '40px', fill : 0xffffff});
button[3].anchor.x = 0.5;
button[3].anchor.y = 0.5;
button[3].position.x = x;
button[3].position.y = y+70;

var selectarrow;
selectarrow = new PIXI.Text(arrow[0],{fontFamily : 'Arial',fontSize : '40px', fill : 0xffffff});
selectarrow.anchor.x = 0.5;
selectarrow.anchor.y = 0.5;
selectarrow.position.x = x;
selectarrow.position.y = y;

function buttonset(){
    for(var i=0;i<button.length;i++){
        stage.addChild(button[i]);
        button[i].interactive = true;
    }
    stage.addChild(selectarrow);
}

//button[0].on('click', ()=>{
//    enemyhp=100;
//    startall();
//});
//button[1].on('click', ()=>{
//    enemyhp=200;
//    startall();
//});
//button[2].on('click', ()=>{
//    enemyhp=300;
//    startall();
//});
//button[3].on('click', ()=>{
//    enemyhp=10000;
//    startall();
//});

var levelserect = false;
var selectlevel = 0;
$(document).on("keyup",(e)=>{
    if(levelserect){
        switch(e.keyCode){
            case 37://nomal
                levelselectmode(1,selectlevel);
                break;
            case 38://easy
                levelselectmode(0,selectlevel);
                break;
            case 39://hard
                levelselectmode(2,selectlevel);
                break;
            case 40://lunatic
                levelselectmode(3,selectlevel);
                break;
            case 13://enter
                var hpdata;
                $.getJSON("../option.json",(data)=>{
                    hpdata=data.hp;
                    switch(selectlevel){
                        case 0:enemyhp=hpdata[0];break;
                        case 1:enemyhp=hpdata[1];break;
                        case 2:enemyhp=hpdata[2];break;
                        case 3:enemyhp=hpdata[3];break;
                    }
                    createjs.Sound.play("decision");
                    startall();
                });
                break;
            case 77://m
                if(e.ctrlKey){
                    enemyhp=10;
                    startall();
                }
                break;
        }
    }
});

function levelselectmode(lev,selev){
    var selevx = button[selev].x;
    var selevy = button[selev].y;
    button[selev].destroy();
    button[selev] = new PIXI.Text(level[selev],{fontFamily : 'Arial',fontSize : '40px', fill : 0xffffff});
    button[selev].position.x = selevx;
    button[selev].position.y = selevy;
    button[selev].anchor.x = 0.5;
    button[selev].anchor.y = 0.5;
    stage.addChild(button[selev]);

    var levx = button[lev].x;
    var levy = button[lev].y;
    button[lev].destroy();
    button[lev] = new PIXI.Text(level[lev],{fontFamily : 'Arial',fontSize : '50px', fill : 0xffffff});
    button[lev].position.x = levx;
    button[lev].position.y = levy;
    button[lev].anchor.x = 0.5;
    button[lev].anchor.y = 0.5;
    stage.addChild(button[lev]);

    selectarrow.destroy();
    selectarrow = new PIXI.Text(arrow[lev],{fontFamily : 'Arial',fontSize : '50px', fill : 0xffffff});
    selectarrow.position.x = x;
    selectarrow.position.y = y;
    selectarrow.anchor.x = 0.5;
    selectarrow.anchor.y = 0.5;
    stage.addChild(selectarrow);

    selectlevel=lev;
    renderer.render(stage);
}


function startall(){
    levelserect=false;
    hpobj.text=enemyhp;
    for(var i=0;i<button.length;i++){
        button[i].destroy();
    }
    selectarrow.destroy();

    renderer.render(stage);
    optionstart();
    enemystart(circle);
    playerstart();

    firsyenemymove();
}
//レンダリング
renderer.render(stage);

//countdown
var countarray=[];
var countdownnum=0;

function countdown(obj,min,max,col,rad){
    for(var i=min;i<max;i++){
        var pi = Math.PI/180;
        obj[i][1].clear();
        obj[i][1].beginFill(col, 1);
        obj[i][1].arc(0,0,rad,-pi*0,-pi*(360*(60-countdownnum)/60), true);
        obj[i][1].lineTo(0,0);
        obj[i][1].x=obj[i][0].x;
        obj[i][1].y=obj[i][0].y;
    }
}