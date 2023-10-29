import { Router } from 'express';

import ArquivosController from '../controllers/ArquivosController';
import loginriquired from '../middlewares/loginriquired';
import filter from '../middlewares/filter';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/arquivo/', loginriquired, TenantMiddleWare, ArquivosController.store);
router.get('/arquivos/', loginriquired, filter, TenantMiddleWare, ArquivosController.index);
router.post('/download/', loginriquired, TenantMiddleWare, ArquivosController.show);
router.put('/arquivo/:id', loginriquired, TenantMiddleWare, ArquivosController.update);
router.delete('/arquivo/:id', loginriquired, TenantMiddleWare, ArquivosController.delete);

export default router;