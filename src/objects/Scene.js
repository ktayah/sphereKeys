import { Group, Vector3 } from 'three';
import Earth from './Earth/Earth.js';
import Flag from './Flag/Flag.js';
import BasicLights from './Lights.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    const earth = new Earth();
    // const flag = new Flag();
    const lights = new BasicLights();

    this.add(earth, lights);
    console.log('Scene', this);
  }

  update(timeStamp) {
    this.rotation.y = timeStamp / 80000;
  }
}