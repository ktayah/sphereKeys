import { Group } from 'three';
import GLTFLoader from 'three-gltf-loader';
import MODEL from './flag.gltf';
import config from '../../config.json';

export default class Flag extends Group {
  constructor() {
    super();
    
    const loader = new GLTFLoader();

    this.name = 'flag';
    this.receiveShadows = false;
    this.position.set(500, 0, 0);
    this.scale.set(2, 2, 2);

    loader.load(MODEL, (gltf) => {
      this.add(gltf.scene);
    }, (xhr) => {
      console.log(`${( xhr.loaded / xhr.total * 100 )}% loaded`);
    }, (error) => {
      console.error('Error:', error);
    });
  }

  /**
   * Sets position of flag on sphere (earth)
   * @param { Number } lat the latitude of the location
   * @param { Number } long the longitude of the location
   * @returns { Object } x, y, z of flag
   */
  spherePositionSet(lat, long) {
    // const lat = 90 - (Math.acos(y / radius)) * 180 / Math.PI;
    // const lon = ((270 + (Math.atan2(x , z)) * 180 / Math.PI) % 360) -180;
    const phi = null;
    const theta = null;
    const rho = null;
    const radius = config.earthRadius;
    const x = math.cos(phi) * math.cos(theta) * rho;
    const y = math.cos(phi) * math.sin(theta) * rho;
    const z = math.sin(phi) * rho;

    return {x, y, z};
  }
}