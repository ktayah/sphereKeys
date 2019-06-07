/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */
'use strict';
import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, CameraHelper, AxesHelper, Vector2, Raycaster, Projector } from 'three';
import OrbitControls from 'three-orbitcontrols'
import SeedScene from './objects/Scene.js';

const scene = new Scene()
const camera = new PerspectiveCamera(/*config.camera.fov*/70, window.innerWidth/window.innerHeight, 1, 10000);
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();
const raycaster = new Raycaster();
const mouse = new Vector2();

// scene
scene.add(seedScene);

// camera
camera.position.set(0, 0, -1000);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x171549, 1);
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25
controls.screenSpacePanning = false;

controls.minDistance = 500;
controls.maxDistance = 1000

controls.maxPolarAngle = Math.PI;
controls.update();

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  seedScene.update && seedScene.update(timeStamp);
  controls.update();
  camera.updateProjectionMatrix();

  // raycaster.setFromCamera(mouse, camera);
  // let rayItems = raycaster.intersectObjects(scene.children[0].children);
  // console.log(rayItems);
  // if (raycontains(rayItems, "flag")) {
  //   console.log('Found Flag');
  // }

  renderer.render(scene, camera);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHandler = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler);

// mouseEvent
const onDocumentMouseMove = (event) => {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
}
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

const raycontains = function(rayIntersects, meshName) {
  let rayItemName;
  let meshInRay = false;
  rayIntersects.every((item,i) => {
    rayItemName = item.object.name;
    if (rayItemName == meshName) {
      console.log(rayItemName);
      meshInRay = true;
      return false;
    } else {
      return true;
    }
  });
  return meshInRay;
}