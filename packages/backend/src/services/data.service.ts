import { DataObject } from "../models/data.model";
import { DataObjectRepository } from "../repositories/data.repository";
// TODO: add logger
export class DataObjectService {
    private dataObjectRepository: DataObjectRepository;
    // TODO: use a library such as InversifyJS to manage dependencies
    constructor() {
        this.dataObjectRepository = new DataObjectRepository();
    }

    // NOTE: in case any business logic is required, it will be done here
    
    async getAllDataObjects(): Promise<DataObject[]> {
        return this.dataObjectRepository.findAll();
    }

    async getDataObjectByPIC(pic: string): Promise<DataObject | undefined> {
        // TODO: add validation
        return this.dataObjectRepository.findByPIC(pic);
    }

    // TODO: add create, update, delete
}
