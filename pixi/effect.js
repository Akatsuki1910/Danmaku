/*jshint esversion: 6 */
var geometry=[];
var material=[];
var box=[];

// レンダラーを作成
const rendererThree = new THREE.WebGLRenderer({
	canvas: document.querySelector('canvas')
});
rendererThree.setPixelRatio(window.devicePixelRatio);
rendererThree.setSize(width, height);
// シーンを作成
const scene = new THREE.Scene();
// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, +1000);
// 箱を作成
geometry[0] = new THREE.TorusGeometry( 200, 30, 20, 100, Math.PI*2);
material[0] = new THREE.MeshLambertMaterial( { color: 0x008866, wireframe:true} );
box[0] = new THREE.Mesh(geometry[0], material[0]);
scene.add(box[0]);
geometry[1] = new THREE.TorusGeometry( 200, 30, 20, 100, Math.PI*2);
material[1] = new THREE.MeshLambertMaterial( { color: 0x008866, wireframe:true} );
box[1] = new THREE.Mesh(geometry[1], material[1]);
scene.add(box[1]);
box[1].rotation.x+=Math.PI/4;
geometry[2] = new THREE.TorusGeometry( 200, 30, 20, 100, Math.PI*2);
material[2] = new THREE.MeshLambertMaterial( { color: 0x008866, wireframe:true} );
box[2] = new THREE.Mesh(geometry[2], material[2]);
scene.add(box[2]);
box[2].rotation.y+=Math.PI/2;
geometry[3] = new THREE.TorusGeometry( 200, 30, 20, 100, Math.PI*2);
material[3] = new THREE.MeshLambertMaterial( { color: 0x008866, wireframe:true} );
box[3] = new THREE.Mesh(geometry[3], material[3]);
scene.add(box[3]);
box[3].rotation.x-=Math.PI/4;
geometry[4] = new THREE.CubeGeometry( 200, 200, 200, 10, 10, 10);
material[4] = new THREE.MeshLambertMaterial( { color: 0x008866, wireframe:true } );
box[4] = new THREE.Mesh(geometry[4], material[4]);
scene.add(box[4]);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 0, 2).normalize();
scene.add(light);

function effectmain() {
    for(var i=0;i<box.length-1;i++){
        box[i].rotation.y += 0.01;
        box[++i].rotation.x += 0.01;
    }
    box[i].rotation.x+=0.01;
    box[i].rotation.y+=0.01;
    box[i].rotation.z+=0.01;
}