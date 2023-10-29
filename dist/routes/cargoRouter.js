"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _CargoController = require('../controllers/CargoController'); var _CargoController2 = _interopRequireDefault(_CargoController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _getAtributes = require('../middlewares/getAtributes'); var _getAtributes2 = _interopRequireDefault(_getAtributes);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/cargo/', _loginriquired2.default, _TenantMiddleWare2.default, _CargoController2.default.store);
router.get("/cargos/", _loginriquired2.default, _getAtributes2.default, _filter2.default, _TenantMiddleWare2.default, _CargoController2.default.index);
router.get("/cargo/:id", _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _CargoController2.default.show);
router.put('/cargo/:id', _loginriquired2.default, _TenantMiddleWare2.default, _CargoController2.default.update);
router.delete('/cargo/:id', _loginriquired2.default, _TenantMiddleWare2.default, _CargoController2.default.delete);

exports. default = router;
