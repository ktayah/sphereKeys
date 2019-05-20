import { Group, ObjectLoader  } from 'three';
import MODEL from './flag.json';

export default class Earth extends Group {
  constructor() {
    const loader = new ObjectLoader();
    
    super();

    this.name = 'flag';

    loader.load(MODEL, (mesh)=>{
      this.add(mesh);
    });
  }
}