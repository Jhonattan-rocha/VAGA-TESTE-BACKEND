"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _setorController = require('../controllers/setorController'); var _setorController2 = _interopRequireDefault(_setorController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/setor/', _loginriquired2.default, _TenantMiddleWare2.default, _setorController2.default.store);
router.get("/setores/", _loginriquired2.default, _filter2.default, _TenantMiddleWare2.default, _setorController2.default.index);
router.get("/setor/:id", _loginriquired2.default, _TenantMiddleWare2.default, _setorController2.default.show);
router.put('/setor/:id', _loginriquired2.default, _TenantMiddleWare2.default, _setorController2.default.update);
router.delete('/setor/:id', _loginriquired2.default, _TenantMiddleWare2.default, _setorController2.default.delete);

exports. default = router;
