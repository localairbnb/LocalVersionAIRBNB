const multer=require('multer')
let fs = require('fs-extra');

module.exports=multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
          let path = './uploads/profilepictures';
          fs.mkdirsSync(path);
          callback(null, path);
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
          },
        fileFilter:(req,file,cb)=>{
            if(!file.mimetype.match(/jpe|jpeg|png$i/)){
                cb(new Error("File not supported"),false)
                return
            }
            cb(null,true)
        }
    
       
})

})