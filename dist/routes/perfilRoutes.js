"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _PerfilController = require('../controllers/PerfilController'); var _PerfilController2 = _interopRequireDefault(_PerfilController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/perfil/', _loginriquired2.default, _TenantMiddleWare2.default, _PerfilController2.default.store);
router.get("/perfis/", _loginriquired2.default, _filter2.default, _TenantMiddleWare2.default, _PerfilController2.default.index);
router.get("/perfil/:id", _loginriquired2.default, _TenantMiddleWare2.default, _PerfilController2.default.show);
router.put('/perfil/:id', _loginriquired2.default, _TenantMiddleWare2.default, _PerfilController2.default.update);
router.delete('/perfil/:id', _loginriquired2.default, _TenantMiddleWare2.default, _PerfilController2.default.delete);

exports. default = router;
