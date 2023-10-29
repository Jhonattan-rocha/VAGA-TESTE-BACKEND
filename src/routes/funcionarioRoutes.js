import { Router } from 'express';
import FuncionarioController from '../controllers/FuncionarioController';
import loginriquired from '../middlewares/loginriquired';
import getAtributes from '../middlewares/getAtributes';
import validateCPFCNPJ from '../middlewares/validateCPFCNPJ';
import filter from '../middlewares/filter';
import TenantMiddleware from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/funcionario/', validateCPFCNPJ, TenantMiddleware, FuncionarioController.store);
router.get("/funcionarios/", loginriquired, getAtributes, filter, TenantMiddleware, FuncionarioController.index);
router.get("/funcionario/:id", loginriquired, getAtributes, TenantMiddleware, FuncionarioController.show);
router.put('/funcionario/:id', loginriquired, getAtributes, TenantMiddleware, FuncionarioController.update);
router.delete('/funcionario/:id', loginriquired, getAtributes, TenantMiddleware, FuncionarioController.delete);

export default router;
