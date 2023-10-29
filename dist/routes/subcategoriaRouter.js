"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _SubCategoriaController = require('../controllers/SubCategoriaController'); var _SubCategoriaController2 = _interopRequireDefault(_SubCategoriaController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _getAtributes = require('../middlewares/getAtributes'); var _getAtributes2 = _interopRequireDefault(_getAtributes);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/subcategoria/', _loginriquired2.default, _TenantMiddleWare2.default, _SubCategoriaController2.default.store);
router.get("/subcategorias/", _loginriquired2.default, _getAtributes2.default, _filter2.default, _TenantMiddleWare2.default, _SubCategoriaController2.default.index);
router.get("/subcategoria/:id", _loginriquired2.default, _TenantMiddleWare2.default, _SubCategoriaController2.default.show);
router.put('/subcategoria/:id', _loginriquired2.default, _TenantMiddleWare2.default, _SubCategoriaController2.default.update);
router.delete('/subcategoria/:id', _loginriquired2.default, _TenantMiddleWare2.default, _SubCategoriaController2.default.delete);

exports. default = router;
