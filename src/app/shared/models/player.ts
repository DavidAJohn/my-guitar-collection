import { MusicItem } from './baseItem';
import { v4 as uuidv4 } from 'uuid';

export class Player {
    id: string;
    itemsOwned: MusicItem[];

    constructor(public email: string,
                public password: string,
                public realName: string,
                public biography: string,
                public profileImagePath: string
                ) {
        this.id = uuidv4();
        this.itemsOwned = [];
    }
}

// const player1 = new Player('player@play.com', 'password', 'Player1', 'Player biog', '/assets/image.jpg');
// const guitar1 = new Guitar('Fender', 'Jaguar', '1975 model', '1975', 'assets/guitar1.jpg', '123123', ItemStatus.Public);
// player1.itemsOwned.push(guitar1);
