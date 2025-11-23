const multer = require("multer");
const path = require("path");
const fs = require("fs");

const dirname = path.join(__dirname, "..", 'uploads');
console.log(dirname);
if(!fs.existsSync(dirname)){
    fs.mkdirSync(dirname, {recursive: true});
}

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, dirname);
    },
    filename: function (req, file,cb){
        // keep original extension, build unique name: timestamp-random.ext
        const exists = path.extname(file.originalname);
        const base = Date.now() + "-" + Math.round(Math.random() * 1E9) ;
        cb(null, base + exists);
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function fileFilter (req, file, cb){
    const allowed = /jpeg|jpg|png|gif|webp|avif|jfif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if(allowed.test(ext)){
        cb(null ,true);
    }else{
        cb(new Error('File type not allowed!'), false);
    }
};

const limits = {
    filesize: 2 * 1024 *1024
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
    
