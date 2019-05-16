import { Group, ObjectLoader  } from 'three';
import MODEL from './earth.json';

export default class Earth extends Group {
  constructor() {
    const loader = new ObjectLoader();
    
    super();

    this.name = 'earth';

    loader.load(MODEL, (mesh)=>{
      this.add(mesh);
    });
  }
}
