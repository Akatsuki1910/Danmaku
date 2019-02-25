/*jshint esversion: 6 */
var button = new PIXI.Text('START',{font : '50px Arial', fill : 0xffffff, align : 'center'});
button.anchor.x = 0.5;
button.anchor.y = 0.5;
button.position.x = width * 0.5;
button.position.y = height * 0.5;
//ボタンをステージに追加
stage.addChild(button);
//タッチイベント(マウスイベント)を有効化
button.interactive = true;
//イベントの追加
button.on('click', ()=>{
    alert("Let's satrt");
    button.destroy();
    renderer.render(stage);
    optionstart();
    enemystart(circle);
    playerstart();

    addcount(0,1,50,"0x000000",x,y);
    countstart(countarray);
    countdownmain();
});
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
        //enemy main
        countarray[i][0] = new PIXI.Graphics();
        countarray[i][0].beginFill(color, 1);
        countarray[i][0].drawCircle(0,0,rad);
        countarray[i][0].endFill();
        countarray[i][0].x=x;
        countarray[i][0].y=y;
        //HP
        countarray[i][3] = new PIXI.Graphics();
        countarray[i][3].beginFill("0xffffff", 1);
        countarray[i][3].drawCircle(0,0,rad*2);
        countarray[i][3].endFill();
        countarray[i][3].x=countarray[i][0].x;
        countarray[i][3].y=countarray[i][0].y;
        //hole
        countarray[i][2] = new PIXI.Graphics();
        countarray[i][2].beginFill("0x000000", 1);
        countarray[i][2].drawCircle(0,0,rad*2-5);
        countarray[i][2].endFill();
        countarray[i][2].x=countarray[i][0].x;
        countarray[i][2].y=countarray[i][0].y;
        //gage
        countarray[i][1] = new PIXI.Graphics();
        countarray[i][1].beginFill("0x000000", 1);
        countarray[i][1].arc(0,0,rad*2,-pi*0,pi*(360), true);
        countarray[i][1].endFill();
        countarray[i][1].x=countarray[i][0].x;
        countarray[i][1].y=countarray[i][0].y;
    }
}

var word = "3";
var style = {font:'bold 40pt Arial', fill:'white'};
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
    requestAnimationFrame(countdownmain);
    countdownnum++;
    if(countdownnum>=60){
        countobj.text--;
        countdownnum=0;
    }
    if(countobj.text==0){
        des(countarray,0,countarray.length,0,countarray[0].length);
        countobj.destroy();
        cancelAnimationFrame(countdownmain);
        requestAnimationFrame(animate);
    }
    countdown(countarray,0,1,"0x000000",100);
    renderer.render(stage);
}