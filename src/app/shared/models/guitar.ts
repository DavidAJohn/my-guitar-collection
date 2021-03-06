import { BaseItem, ItemStatus } from './baseItem';

export class Guitar extends BaseItem {
    yearMade: string;
    imagePath: string;
    numStrings: number;

    constructor(
                manufacturer: string,
                modelName: string,
                description: string,
                ownerId: string,
                itemStatus: ItemStatus,
                yearMade: string,
                imagePath: string,
                numStrings: number
                ) {
        super(manufacturer, modelName, description, ownerId, itemStatus);
        this.yearMade = yearMade;
        this.imagePath = imagePath;
        this.numStrings = numStrings;
    }
}

// const guitar = new Guitar('Fender', 'Jaguar', '1975 model', '123123', ItemStatus.Public, '1975', 'assets/guitar1.jpg', 6);
