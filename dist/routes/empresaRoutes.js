"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _EmpresaController = require('../controllers/EmpresaController'); var _EmpresaController2 = _interopRequireDefault(_EmpresaController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _getAtributes = require('../middlewares/getAtributes'); var _getAtributes2 = _interopRequireDefault(_getAtributes);
var _validateCPFCNPJ = require('../middlewares/validateCPFCNPJ'); var _validateCPFCNPJ2 = _interopRequireDefault(_validateCPFCNPJ);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/empresa/', _validateCPFCNPJ2.default, _TenantMiddleWare2.default, _EmpresaController2.default.store);
router.get("/empresas/", _loginriquired2.default, _getAtributes2.default, _filter2.default, _TenantMiddleWare2.default, _EmpresaController2.default.index);
router.get("/empresa/:id", _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _EmpresaController2.default.show);
router.put('/empresa/:id', _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _EmpresaController2.default.update);
router.delete('/empresa/:id', _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _EmpresaController2.default.delete);

exports. default = router;