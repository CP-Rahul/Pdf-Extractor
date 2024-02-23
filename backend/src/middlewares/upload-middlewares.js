const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/temp')
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrefix+'-'+file.originalname)
    }
  });
  
const uploadFiles = multer({ storage: storage });


module.exports = {
    uploadFiles
}