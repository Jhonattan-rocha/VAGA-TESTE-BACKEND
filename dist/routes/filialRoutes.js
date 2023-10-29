"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _FilialsController = require('../controllers/FilialsController'); var _FilialsController2 = _interopRequireDefault(_FilialsController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _validateCPFCNPJ = require('../middlewares/validateCPFCNPJ'); var _validateCPFCNPJ2 = _interopRequireDefault(_validateCPFCNPJ);
var _getAtributes = require('../middlewares/getAtributes'); var _getAtributes2 = _interopRequireDefault(_getAtributes);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/filiais/', _loginriquired2.default, _validateCPFCNPJ2.default, _TenantMiddleWare2.default, _FilialsController2.default.store);
router.get("/filial/", _loginriquired2.default, _getAtributes2.default, _filter2.default, _TenantMiddleWare2.default, _FilialsController2.default.index);
router.get("/filial/:id", _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _FilialsController2.default.show);
router.put('/filial/:id', _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _FilialsController2.default.update);
router.delete('/filial/:id', _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _FilialsController2.default.delete);

exports. default = router;