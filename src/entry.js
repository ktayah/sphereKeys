/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */
'use strict';
import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, Vector2, Raycaster } from 'three';
import OrbitControls from 'three-orbitcontrols'
import SeedScene from './objects/Scene.js';
import Player from './player/Player.js';
import config from './config.json';
import './styles/entry.css';

console.log(config);

const scene = new Scene()
const camera = new PerspectiveCamera(70, 2, 1, 10000); // No reason to set aspect here because it will be set later
const renderer = new WebGLRenderer({antialias: true, canvas: document.querySelector('canvas')});
const seedScene = new SeedScene();
const raycaster = new Raycaster();
const mouse = new Vector2();
const canvas = renderer.domElement;
let clicked;

// scene
scene.add(seedScene);

// camera
camera.position.set(0, 0, -800);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setClearColor(0x171549, 1);
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.25
controls.screenSpacePanning = false;

controls.minDistance = 500;
controls.maxDistance = 1000

controls.maxPolarAngle = Math.PI;
controls.update();

// canvasResize
const resizeCanvasToDisplaySize = () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  return { height, width }
}

// render loop
const animate = (timeStamp) => {
  seedScene.update && seedScene.update(timeStamp);
  controls.update();
  camera.updateProjectionMatrix();
  resizeCanvasToDisplaySize();
  if (clicked) raycast();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

// resize
const windowResizeHandler = () => { 
  const { height, width } = resizeCanvasToDisplaySize();
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler);

// mouseEvent
const onDocumentMouseMove = (event) => {
  event.preventDefault();
  const { height, width } = resizeCanvasToDisplaySize(); 
  mouse.x = (event.clientX / width) * 2 - 1;
  mouse.y = - (event.clientY / height) * 2 + 1;
}
canvas.addEventListener( 'mousemove', onDocumentMouseMove, false);
canvas.addEventListener('mousedown', () => {
  clicked = true;
});
canvas.addEventListener('mouseup', () => {
  clicked = false;
});

// buttonEvents
let button;
document.getElementById('b0').addEventListener("click", function() {
  button = 'I-IV-V';
});
document.getElementById('b1').addEventListener("click", function() {
  button = 'I-IV-I-V';
});
document.getElementById('b2').addEventListener("click", function() {
  button = 'I-V-vi-IV';
});
document.getElementById('b3').addEventListener("click", function() {
  button = 'I-vi-IV-V';
});

// racasting
const raycast = () => {
  raycaster.setFromCamera(mouse, camera);
  let rayItems = raycaster.intersectObjects(seedScene.children, true);
  if (rayItems.length != 0 && button != null) {
    const tube = raycontains(rayItems, "Tube001");
    const box = raycontains(rayItems, "Box001");
    if (tube.meshInRay || box.meshInRay) {
      const obj = tube.meshInRay ? tube.itemInRay.object : box.itemInRay.object;
      const country = obj.parent.parent.country;
      const instrument = obj.parent.parent.instrument;
      const music = new Player(instrument);
      const randomProgression = Math.floor(Math.random()*config.progressions[button].length)
      const progression = config.progressions[button][randomProgression];
      console.log(country, instrument, progression);
      music.playProgression(progression);
    }
  }
}

const raycontains = function(rayIntersects, meshName) {
  let rayItemName;
  let meshInRay = false;
  let itemInRay;
  rayIntersects.every((item, i) => {
    rayItemName = item.object.name;
    if (rayItemName == meshName) {
      meshInRay = true;
      itemInRay = item;
      return false;
    } else {
      return true;
    }
  });
  return { itemInRay, meshInRay };
}