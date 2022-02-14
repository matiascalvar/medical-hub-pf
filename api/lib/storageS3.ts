import dotenv from "dotenv";
import aws from 'aws-sdk'
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')

dotenv.config();

var app = express()

const region = "us-east-1"
const bucketName = "medical-hub"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
  })

var uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: function (req:any, file:any, cb:any) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req:any, file:any, cb:any) {
      cb(null, Date.now().toString())
    },
    Expires: 60
  })
})

module.exports = uploadS3


