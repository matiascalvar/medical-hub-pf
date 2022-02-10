import dotenv from "dotenv";
import aws from 'aws-sdk'
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')

dotenv.config();

var app = express()

const region = "us-east-1"
const bucketName = "medical-hub"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "AKIA6P5PBQYSWIHH2CJL"
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "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"

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
    // acl: 'public-read',
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


