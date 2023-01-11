import { Router } from 'express';
import moviesController from '../controller/movies.controller';

const router = Router();

router.get('/', moviesController.find);   // CREATE Route
export default router;