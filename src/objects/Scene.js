import { Group } from 'three';
import Earth from './Earth/Earth.js';
import BasicLights from './Lights.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    const earth = new Earth();
    const lights = new BasicLights();

    this.add(earth, lights);
  }

  update(timeStamp) {
    this.rotation.y = timeStamp / 10000;
  }
}