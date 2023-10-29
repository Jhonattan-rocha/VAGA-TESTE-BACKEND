"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

const aleatorio = () =>{
    return Math.floor(Math.random() * 10000 + 10000);
}

const maxSize = 50 * 1024 * 1024;

exports. default = {
    storage: _multer2.default.diskStorage({
        destination: (req, file, cb) =>{
            // o primeiro parametro é para receber erros
            cb(null, _path2.default.resolve(__dirname, '..', '..', 'uploads', 'arquivos'))
        },
        filename: (req, file, cb) =>{
            cb(null, `${Date.now()}_${aleatorio()}${_path2.default.extname(file.originalname)}`)
        },
    }),
    fileFilter: (req, file, cb) =>{
        const scriptMimetypes = [
            "application\\/javascript",
            "application\\/x-javascript",
            "text\\/javascript",
            "text\\/ecmascript",
            "application\\/ecmascript",
            "application\\/x-python",
            "application\\/x-bat",
            "application\\/x-bash",
            "application\\/x-c\\+\\+",
            "application\\/x-c\\#",
            "text\\/python",
          ];

        const scriptRegexPattern = new RegExp(`(${scriptMimetypes.join('|')})`);

        if(scriptRegexPattern.test(file.mimetype) || !file.mimetype){
            return cb(new _multer2.default.MulterError('Arquivo do tipo invalido'));
        };
        return cb(null, true);
    },
    limits: { fileSize: maxSize }
};
