import { Studie } from "../src/models/Studie";

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
      cb(null, '../api/src/storage')
    },
    filename: function (req:any, file:any, cb:any) {
      const type = file.mimetype.split('/');
      var fileType: string;
      switch(type[1].toString()){
          case 'jpg':
          fileType = '.jpg';
          break;
          case 'png':
          fileType = '.png';
          break;    
          default:
          fileType = '.pdf';
          break;
      }  
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + fileType)

      const idStudy = req.params.id;

      const study = Studie.findOne({where:{
        id: idStudy
    }})
    .then((result) => {
      result?.update({
          studyPDF: file.fieldname + '-' + uniqueSuffix + fileType,
          state: 'COMPLETED'
      })

    })

    }
  })

  const upload = multer({ storage })

  module.exports = upload