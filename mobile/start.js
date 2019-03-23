/*jshint esversion: 6 */
var button = [];
var level = ["EASY","NOMAL","HARD","LUNATIC"];
var arrow = ["↑","←","→","↓"];
button[0] = new PIXI.Text(level[0],{fontFamily : 'Arial',fontSize : '60px', fill : 0xffffff});
button[0].anchor.x = 0.5;
button[0].anchor.y = 0.5;
button[0].position.x = x;
button[0].position.y = y-170;
button[1] = new PIXI.Text(level[1],{fontFamily : 'Arial',fontSize : '60px', fill : 0xffffff});
button[1].anchor.x = 0.5;
button[1].anchor.y = 0.5;
button[1].position.x = x-150;
button[1].position.y = y;
button[2] = new PIXI.Text(level[2],{fontFamily : 'Arial',fontSize : '60px', fill : 0xffffff});
button[2].anchor.x = 0.5;
button[2].anchor.y = 0.5;
button[2].position.x = x+150;
button[2].position.y = y;
button[3] = new PIXI.Text(level[3],{fontFamily : 'Arial',fontSize : '60px', fill : 0xffffff});
button[3].anchor.x = 0.5;
button[3].anchor.y = 0.5;
button[3].position.x = x;
button[3].position.y = y+170;

function buttonset(){
    for(var i=0;i<button.length;i++){
        stage.addChild(button[i]);
        button[i].interactive = true;
    }
}

button[0]
.on('touchstart', ()=>{
    if(levelserect){enemyhp=100;startall();}
})
.on('mousedown', ()=>{
    if(levelserect){enemyhp=100;startall();}
});
button[1]
.on('touchstart', ()=>{
    if(levelserect){enemyhp=200;startall();}
})
.on('mousedown', ()=>{
    if(levelserect){enemyhp=200;startall();}
});
button[2]
.on('touchstart', ()=>{
    if(levelserect){enemyhp=300;startall();}
})
.on('mousedown', ()=>{
    if(levelserect){enemyhp=300;startall();}
});
button[3]
.on('touchstart', ()=>{
    if(levelserect){enemyhp=10000;startall();}
})
.on('mousedown', ()=>{
    if(levelserect){enemyhp=10000;startall();}
});

var levelserect = false;


function startall(){
    levelserect=false;
    hpobj.text=enemyhp;
    for(var i=0;i<button.length;i++){
        button[i].destroy();
    }

    renderer.render(stage);
    optionstart();
    enemystart(circle);
    playerstart();

    addcount(0,1,50,"0x000000",x,y);
    countstart(countarray);
    countdownmain();
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

function addcount(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        countarray[i]= [];

        countarray[i][0] = new PIXI.Graphics();
        countarray[i][0].beginFill(color, 1);
        countarray[i][0].drawCircle(0,0,rad);
        countarray[i][0].endFill();
        countarray[i][0].x=x;
        countarray[i][0].y=y;

        countarray[i][3] = new PIXI.Graphics();
        countarray[i][3].beginFill("0xffffff", 1);
        countarray[i][3].drawCircle(0,0,rad*2);
        countarray[i][3].endFill();
        countarray[i][3].x=countarray[i][0].x;
        countarray[i][3].y=countarray[i][0].y;

        countarray[i][2] = new PIXI.Graphics();
        countarray[i][2].beginFill("0x000000", 1);
        countarray[i][2].drawCircle(0,0,rad*2-5);
        countarray[i][2].endFill();
        countarray[i][2].x=countarray[i][0].x;
        countarray[i][2].y=countarray[i][0].y;

        countarray[i][1] = new PIXI.Graphics();
        countarray[i][1].beginFill("0x000000", 1);
        countarray[i][1].arc(0,0,rad*2,-pi*0,pi*(360), true);
        countarray[i][1].endFill();
        countarray[i][1].x=countarray[i][0].x;
        countarray[i][1].y=countarray[i][0].y;
    }
}

var word = "3";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var countobj = new PIXI.Text(word, style);

countobj.x=x-10;
countobj.y=y-20;

function countstart(obj){
    for(var i=obj[0].length-1;i>=0;i--){
        stage.addChild(obj[0][i]);
    }
    stage.addChild(countobj);
}

function countdownmain(){
    if(countobj.text==0){
        des(countarray,0,countarray.length,0,countarray[0].length);
        countobj.destroy();
        cancelAnimationFrame(countdownmain);
        firsyenemymove();
    }else{
        requestAnimationFrame(countdownmain);
        countdownnum++;
        if(countdownnum>=60){
            countobj.text--;
            countdownnum=0;
        }
        countdown(countarray,0,1,"0x000000",100);
        renderer.render(stage);
    }
}