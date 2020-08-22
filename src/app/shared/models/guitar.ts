import { MusicItem, ItemStatus } from './baseItem';
import { v4 as uuidv4 } from 'uuid';

export class Guitar extends MusicItem {
    id: string;

    constructor(public manufacturer: string,
                public modelName: string,
                public description: string,
                public yearMade: string,
                public imagePath: string,
                public ownerId: string,
                public itemStatus: ItemStatus) {
        super();
        this.id = uuidv4();
    }
}
