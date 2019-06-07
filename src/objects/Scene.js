import { Group } from 'three';
import Earth from './Earth/Earth.js';
import Flag from './Flag/Flag.js';
import BasicLights from './Lights.js';
import config from '../config.json';

export default class SeedScene extends Group {
  constructor() {
    super();
    console.log(config);
    const earth = new Earth();
    const flag = new Flag(5, 65);
    const lights = new BasicLights();

    this.add(earth, flag, lights);
  }

  update(timeStamp) {
    this.rotation.y = timeStamp / 80000;
  }
}