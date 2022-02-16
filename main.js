import './style.css'
import * as THREE from '/node_modules/three/build/three.js';
import {OrbitControls} from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

// Code for collapse elements
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//Add Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);
//scene.add(torus);

//Add light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//Add grid
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStars(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);

}

Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture
  })
);

//scene.add(moon);
//moon.position.z = 30;
//moon.position.x = -10;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Constantly render screen
function animate() {
  requestAnimationFrame(animate);
  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
  moon.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();