import { Group, SpotLight, PointLight, AmbientLight, HemisphereLight, SpotLightHelper } from 'three';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const point = new PointLight(0xFFFFFF, 1, 0, 1);
    const pointRear = point.clone();
    const pointLeft = point.clone();
    const pointRight = point.clone();
    const spot = new SpotLight(0xFFFFFF, 0.8, 7, 0.8, 1, 1);
    const ambi = new AmbientLight( 0x404040 , 1);
    const hemi = new HemisphereLight( 0xffffbb, 0x080820, 1.15 );

    spot.position.set(0,0,0);
    spot.target.position.set(0,0,0);

    //point.position.set(0, 0, -10000);
    // pointRear.position.set(0, 0, 10000);
    // pointLeft.position.set(10000, 0, 0);
    // pointRight.position.set(0, 10000, 0);
    
    point.position.set(1000, 0, 0);
    pointRear.position.set(-1000, 0, 0);
    pointLeft.position.set(0, 1000, -1000);
    pointRight.position.set(1000, 0, -1000);
    this.add(ambi, hemi, point, pointRear, pointLeft, pointRight);
  }
}
