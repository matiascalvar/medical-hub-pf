import dotenv from "dotenv";
import aws from 'aws-sdk'

dotenv.config();

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

export async function generateUploadUrl(){
  const imageName = Date.now() + '-' + Math.round(Math.random() * 1E9)

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
  return uploadUrl

} 

