import { Router } from 'express';
import EmpresaController from '../controllers/EmpresaController';
import loginriquired from '../middlewares/loginriquired';
import getAtributes from '../middlewares/getAtributes';
import validateCPFCNPJ from '../middlewares/validateCPFCNPJ';
import filter from '../middlewares/filter';
import TenantMiddleware from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/empresa/', validateCPFCNPJ, TenantMiddleware, EmpresaController.store);
router.get("/empresas/", loginriquired, getAtributes, filter, TenantMiddleware, EmpresaController.index);
router.get("/empresa/:id", loginriquired, getAtributes, TenantMiddleware, EmpresaController.show);
router.put('/empresa/:id', loginriquired, getAtributes, TenantMiddleware, EmpresaController.update);
router.delete('/empresa/:id', loginriquired, getAtributes, TenantMiddleware, EmpresaController.delete);

export default router;
