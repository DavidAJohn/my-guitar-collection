import { Guitar } from './guitar';
import { Amplifier } from './amplifier';

export class Player {
    uid: string;
    guitarsOwned: Guitar[];
    ampsOwned: Amplifier[];

    constructor(
                public email: string,
                public password: string,
                public displayName: string,
                public biography: string,
                public profileImagePath: string
                ) {
        this.guitarsOwned = [];
        this.ampsOwned = [];
    }
}

// const player1 = new Player('player@play.com', 'password', 'Player1', 'Player biog', '/assets/image.jpg');
// const guitar1 = new Guitar('Fender', 'Jaguar', '1975 model', player.id, ItemStatus.Public, '1975', 'assets/guitar1.jpg');
// player1.guitarsOwned.push(guitar1);
