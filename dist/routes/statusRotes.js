"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _StatusController = require('../controllers/StatusController'); var _StatusController2 = _interopRequireDefault(_StatusController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/status/', _loginriquired2.default, _TenantMiddleWare2.default, _StatusController2.default.store);
router.get("/statuslist/", _loginriquired2.default, _filter2.default, _TenantMiddleWare2.default, _StatusController2.default.index);
router.get("/status/:id", _loginriquired2.default, _TenantMiddleWare2.default, _StatusController2.default.show);
router.put('/status/:id', _loginriquired2.default, _TenantMiddleWare2.default, _StatusController2.default.update);
router.delete('/status/:id', _loginriquired2.default, _TenantMiddleWare2.default, _StatusController2.default.delete);

exports. default = router;
