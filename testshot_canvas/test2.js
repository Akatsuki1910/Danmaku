var c = document.getElementById("canvas");
var $ = c.getContext('2d');
c.width = window.innerWidth;
c.height = window.innerHeight;
$.fillStyle = 'hsla(0,0%,0%,1)';

window.addEventListener('resize', function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}, false);
//ここまで

var p=0;
var color = "#ff0000";
var k=1;

var hen=100;

function kamashi(){
    p-=hen;
}

function draw() {
    era();
    for(var l=0;l<k;l++){
        for(var i=0;i<360;i+=30){
            shot(c.width/2,c.height/2,i,35,p);
        }
        kamashi();
        console.log(p);
    }
    p+=hen*l;
    p++;
    if(p%hen==0)k++;
}

function shot(x,y,dir,rad,sp){
    $.beginPath();
    $.fillStyle = color;
    $.arc(x+Math.cos(dir*(Math.PI/180))*sp,y+Math.sin(dir*(Math.PI/180))*sp, rad, 0, Math.PI*2, false);
    $.fill();
}

function era(){
    $.clearRect(0, 0, c.width, c.height);
}

function run() {
    window.requestAnimationFrame(run);
    //for(var i=0;i<200;i++){
        draw();
    //}
}

function colorchange(col){
    var c;
    while(true){
        c = Math.floor(Math.random()*(16777215));
        if(c==col){continue;}else{break;}
    }
    color="#"+Number(c).toString(16);

}

run();