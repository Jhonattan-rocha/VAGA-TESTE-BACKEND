"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _ComentarioController = require('../controllers/ComentarioController'); var _ComentarioController2 = _interopRequireDefault(_ComentarioController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/comentario/', _loginriquired2.default, _TenantMiddleWare2.default, _ComentarioController2.default.store);
router.get("/comentarios/", _loginriquired2.default, _filter2.default, _TenantMiddleWare2.default, _ComentarioController2.default.index);
router.get("/comentario/:id", _loginriquired2.default, _TenantMiddleWare2.default, _ComentarioController2.default.show);
router.put('/comentario/:id', _loginriquired2.default, _TenantMiddleWare2.default, _ComentarioController2.default.update);
router.delete('/comentario/:id', _loginriquired2.default, _TenantMiddleWare2.default, _ComentarioController2.default.delete);

exports. default = router;
