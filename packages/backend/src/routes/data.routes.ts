import { Router } from 'express';
import { DataObjectController } from '../controllers/data.controller';

const router = Router();
const dataObjectController = new DataObjectController();

router.get('/data', dataObjectController.getAllDataObjects.bind(dataObjectController));
router.get('/data/pic/:pic', dataObjectController.getDataObjectById.bind(dataObjectController))

// TODO: implement rest of CRUD if needed

export default router;
