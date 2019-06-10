import { Group } from 'three';
import Earth from './Earth/Earth.js';
import Flag from './Flag/Flag.js';
import config from '../config.json';
import BasicLights from './Lights.js';

console.log(config);

export default class SeedScene extends Group {
  constructor() {
    super();
    const earth = new Earth();
    const lights = new BasicLights();
    
    this.add(earth, lights);
    for (let place of config.countries) {
      this.add(new Flag(place.lat, place.long, place.country, place.instrument));
    }
  }

  update(timeStamp) {
    this.rotation.y = timeStamp / 80000;
  }
}