import { Group } from 'three';
import GLTFLoader from 'three-gltf-loader';
import MODEL from './earth.gltf';

export default class Earth extends Group {
  constructor() {
    super();
    
    const loader = new GLTFLoader();
    this.name = 'earth';
    
    loader.load(MODEL, (gltf) => {
      this.add(gltf.scene);
    }, (xhr) => {
      console.log(`${( xhr.loaded / xhr.total * 100 )}% loaded`);
    }, (error) => {
      console.error('Error:', error);
    });
    this.receiveShadows = false;
    this.scale.set(0.8, 0.8, 0.8);
    this.position.x = 0;
    this.position.y = 0;
    this.position.z = 0;
  }
}