"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _ToolsController = require('../controllers/ToolsController'); var _ToolsController2 = _interopRequireDefault(_ToolsController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/consult/', _loginriquired2.default, _TenantMiddleWare2.default, _ToolsController2.default.consult);

exports. default = router;
