"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _CategoriaController = require('../controllers/CategoriaController'); var _CategoriaController2 = _interopRequireDefault(_CategoriaController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/categoria/', _loginriquired2.default, _TenantMiddleWare2.default, _CategoriaController2.default.store);
router.get("/categorias/", _loginriquired2.default, _filter2.default, _TenantMiddleWare2.default, _CategoriaController2.default.index);
router.get("/categoria/:id", _loginriquired2.default, _TenantMiddleWare2.default, _CategoriaController2.default.show);
router.put('/categoria/:id', _loginriquired2.default, _TenantMiddleWare2.default, _CategoriaController2.default.update);
router.delete('/categoria/:id', _loginriquired2.default, _TenantMiddleWare2.default, _CategoriaController2.default.delete);

exports. default = router;
