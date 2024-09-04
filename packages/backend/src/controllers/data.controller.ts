import { Request, Response } from 'express';
import { DataObjectService } from '../services/data.service';
import { DataObject } from '../models/data.model';

// NOTE: controller should remain skinny. Any business logic is to be done in the service
export class DataObjectController {
  private dataObjectService: DataObjectService;

  constructor() {
    this.dataObjectService = new DataObjectService();
  }

  async getAllDataObjects(_req: Request, res: Response): Promise<Response<DataObject[]>> {
    const dataObjects = await this.dataObjectService.getAllDataObjects();
    return res.json(dataObjects);
  }

  async getDataObjectById(req: Request, res: Response): Promise<Response<DataObject>> {
    const pic = req.params.pic;
    try {
        const dataObject = await this.dataObjectService.getDataObjectByPIC(pic);
        if (dataObject) {
            return res.json(dataObject);
        }
        return res.status(404).send('Data not found');
    } catch (ex) {
        // TODO: implement a proper error handler that takes thrown exceptions and parses them into an appropriate http response output
        return res.status(500);
    }
  }
  // TODO: add create, update and delete if needed
}
