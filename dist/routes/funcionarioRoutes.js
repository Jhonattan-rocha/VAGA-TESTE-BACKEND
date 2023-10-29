"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _FuncionarioController = require('../controllers/FuncionarioController'); var _FuncionarioController2 = _interopRequireDefault(_FuncionarioController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _getAtributes = require('../middlewares/getAtributes'); var _getAtributes2 = _interopRequireDefault(_getAtributes);
var _validateCPFCNPJ = require('../middlewares/validateCPFCNPJ'); var _validateCPFCNPJ2 = _interopRequireDefault(_validateCPFCNPJ);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/funcionario/', _loginriquired2.default, _validateCPFCNPJ2.default, _TenantMiddleWare2.default, _FuncionarioController2.default.store);
router.get("/funcionarios/", _loginriquired2.default, _getAtributes2.default, _filter2.default, _TenantMiddleWare2.default, _FuncionarioController2.default.index);
router.get("/funcionario/:id", _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _FuncionarioController2.default.show);
router.put('/funcionario/:id', _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _FuncionarioController2.default.update);
router.delete('/funcionario/:id', _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _FuncionarioController2.default.delete);

exports. default = router;
