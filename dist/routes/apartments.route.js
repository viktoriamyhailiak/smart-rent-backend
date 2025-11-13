import { Router } from 'express';
import { getAllApartments } from '../controllers/apartments.controller.ts';
const apartmentsRouter = Router();
apartmentsRouter.get('/', getAllApartments);
export default apartmentsRouter;
