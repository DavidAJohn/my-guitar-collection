import { v4 as uuidv4 } from 'uuid';

export abstract class BaseItem {
    id = uuidv4();
    manufacturer: string;
    modelName: string;
    description: string;
    ownerId: string;
    itemStatus: ItemStatus;
    dateAdded = new Date();

    constructor(
                manufacturer: string,
                modelName: string,
                description: string,
                ownerId: string,
                itemStatus: ItemStatus
                ) {
        this.manufacturer = manufacturer;
        this.modelName = modelName;
        this.description = description;
        this.ownerId = ownerId;
        this.itemStatus = itemStatus;
    }

    getItemFullName(): string {
        return this.manufacturer + ' ' + this.modelName;
    }
}

export enum ItemStatus {
    Private,
    Public
}
