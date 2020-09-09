import { BaseItem, ItemStatus } from './baseItem';

export class Amplifier extends BaseItem {
    yearMade: string;
    imagePath: string;
    ampType: AmplifierType;

    constructor(
                manufacturer: string,
                modelName: string,
                description: string,
                ownerId: string,
                itemStatus: ItemStatus,
                yearMade: string,
                imagePath: string,
                ampType: AmplifierType
                ) {
        super(manufacturer, modelName, description, ownerId, itemStatus);
        this.yearMade = yearMade;
        this.imagePath = imagePath;
        this.ampType = ampType;
    }
}

export enum AmplifierType {
    Valve = 1,
    SolidState
}

// const newAmp = new Amplifier('Blackstar', 'HT Club 40 Mk 2', 'Mk 2 model from 2018', player.id, ItemStatus.Public,
//                              '2018', '/assets/image1.jpg', AmplifierType.Valve);
// const newAmpName = newAmp.getItemFullName();
// const newAmpModelName = newAmp.modelName;
