import { BaseItem, ItemStatus } from './baseItem';

export class Guitar extends BaseItem {
    yearMade: string;
    imagePath: string;
    numStrings: number;
    ownerName: string;
    likes: number;

    constructor(
                manufacturer: string,
                modelName: string,
                description: string,
                ownerId: string,
                ownerName: string,
                itemStatus: ItemStatus,
                yearMade: string,
                imagePath: string,
                numStrings: number,
                likes: number
                ) {
        super(manufacturer, modelName, description, ownerId, itemStatus);
        this.yearMade = yearMade;
        this.imagePath = imagePath;
        this.numStrings = numStrings;
        this.ownerName = ownerName;
        this.likes = likes;
    }
}

// const guitar = new Guitar('Fender', 'Jaguar', '1975 model', '123123', ItemStatus.Public, '1975', 'assets/guitar1.jpg', 6);
