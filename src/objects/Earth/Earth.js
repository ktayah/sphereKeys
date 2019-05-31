import { Group, Vector3 } from 'three';
import GLTFLoader from 'three-gltf-loader';
import MODEL from './low_poly_earth.gltf';

export default class Earth extends Group {
  constructor() {
    super();
    
    const loader = new GLTFLoader();

    this.name = 'earth';
    this.receiveShadows = false;
    this.scale.set(0.8, 0.8, 0.8);

    loader.load(MODEL, (gltf) => {
      this.add(gltf.scene);
    }, (xhr) => {
      console.log(`${( xhr.loaded / xhr.total * 100 )}% loaded`);
    }, (error) => {
      console.error('Error:', error);
    });
  }
}