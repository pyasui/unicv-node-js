import { Router } from 'express';
import { OrderController } from '../controllers/order-controller';

const router = Router();
router.post('/', OrderController.createOrder);

export default router;
