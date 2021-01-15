//Multer is excellent library for our API middleware to get the photo from the frontend
//Multer-s3 will directly upload whenever you upload a photo from frontend to backend, it will automatically upload it to s3 bucket 

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.aws_secret_access_key,
    accessKeyId: process.env.aws_access_key_id,
    aws_session_token: process.env.aws_session_token
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'pis-online-store',
        acl: 'public read',
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname});      //value will be name of the file
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())     //key will be date that we just uploaded file
        }
    })
});

module.exports = upload;