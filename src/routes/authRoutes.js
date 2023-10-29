import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import loginriquired from '../middlewares/loginriquired';
import getAtributes from '../middlewares/getAtributes';
import filter from '../middlewares/filter';
import TenantMiddleware from '../middlewares/TenantMiddleWare';

const router = new Router();

router.get("/usuarios/", getAtributes, filter, TenantMiddleware, AuthController.index);
router.get("/usuario/:id", getAtributes, TenantMiddleware, AuthController.show);
router.put('/usuario/:id', getAtributes, TenantMiddleware, AuthController.update);
router.delete('/usuario/:id', getAtributes, TenantMiddleware, AuthController.delete);

export default router;
