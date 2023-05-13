const multer = require('multer')
const uuid4 = require('uuid').v4
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname.toLowerCase())
        cb(null, `${file.fieldname} ${uuid4()} ${ext}`)
    }
}) 

const fileFilter = (res, file, cb) => {
    const ext = path.extname(file.originalname.toLowerCase())
    if(!ext.match(/jpg|png|jpeg/)) {
        return cb(new Error("Only JPG, JPEG and PNG allowed"), false)
    }
    cb(null, true)
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 1024*1024*5}
})

module.exports = upload, fileFilter 