import { Group, Vector3 } from 'three';
import GLTFLoader from 'three-gltf-loader';
import MODEL from './flag.gltf';
import config from '../../config.json';

export default class Flag extends Group {
  constructor(lat, long) {
    super();
    
    this.name = 'flag';
    const location = this.spherePositionSet(lat, long);
    
    const loader = new GLTFLoader();
    loader.load(MODEL, (gltf) => {
      this.add(gltf.scene);
    }, (xhr) => {
      console.log(`${( xhr.loaded / xhr.total * 100 )}% loaded`);
    }, (error) => {
      console.error('Error:', error);
    });
    
    this.scale.set(2, 2, 2);
    this.lookAt(new Vector3(location.x, location.y, location.z));
    this.rotateX(0.5*Math.PI);
    this.position.set(location.x, location.y, location.z);
  }

  /**
   * Sets position of flag on sphere (earth)
   * @param { Number } lat the latitude of the location
   * @param { Number } long the longitude of the location
   * @returns { Object } x, y, z of flag
   */
  spherePositionSet(lat, long) {
    const radius = 350; //config.earthRadius;
    lat *= Math.PI/180;
    long *= Math.PI/180;
    const x = radius * Math.cos(lat) * Math.cos(long);
    const y = radius * Math.cos(lat) * Math.sin(long);
    const z = radius * Math.sin(lat);
    return {x, y, z};
  }
}