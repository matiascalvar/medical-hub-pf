"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Studie_1 = require("../src/models/Studie");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../api/src/storage');
    },
    filename: function (req, file, cb) {
        const type = file.mimetype.split('/');
        var fileType;
        switch (type[1].toString()) {
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
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileType);
        const idStudy = req.params.id;
        const study = Studie_1.Studie.findOne({ where: {
                id: idStudy
            } })
            .then((result) => {
            result === null || result === void 0 ? void 0 : result.update({
                studyPDF: file.fieldname + '-' + uniqueSuffix + fileType,
                state: 'COMPLETED'
            });
        });
    }
});
const upload = multer({ storage });
module.exports = upload;
