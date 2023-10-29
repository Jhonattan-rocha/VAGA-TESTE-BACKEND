import multer from "multer";
import path from 'path';

const aleatorio = () =>{
    return Math.floor(Math.random() * 10000 + 10000);
}

const maxSize = 50 * 1024 * 1024;

export default {
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            // o primeiro parametro é para receber erros
            cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'arquivos'))
        },
        filename: (req, file, cb) =>{
            cb(null, `${Date.now()}_${aleatorio()}${path.extname(file.originalname)}`)
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
            return cb(new multer.MulterError('Arquivo do tipo invalido'));
        };
        return cb(null, true);
    },
    limits: { fileSize: maxSize }
};
