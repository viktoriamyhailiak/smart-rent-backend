import { Router } from 'express';
import { getAllApartments } from '../controllers/apartments.controller';
const apartmentsRouter = Router();
apartmentsRouter.get('/', getAllApartments);
export default apartmentsRouter;
