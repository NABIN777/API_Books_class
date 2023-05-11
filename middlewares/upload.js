const multer=require('multer')
const uuid=require('uuid').v4
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,file,cb)=>{
        const ext=path.extname=(file.originalname.toLowerCase())

        cb(null,'${file.fieldname}${uuid4()}${ext}')
    }

})
const upload=multer({
    storage:storage
})
module.exports=upload