import { Router } from 'express';
import tokenController from '../controllers/TokenController';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/token/', TenantMiddleWare, tokenController.store);

export default router;