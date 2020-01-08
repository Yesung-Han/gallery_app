const express = require('express');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk'); 

const router = express.Router();

/* uploads img to s3 */
AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'ap-northeast-2'
});

const upload = multer({    
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'yong-suk-gallery-app',
        key(req, file, cb){
            cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
        },
    }),
})

router.post('/', upload.single('img'), (req, res, next)=>{
    console.log("1111111111111111111");
    console.log(req.file);
    res.json({ 
        url: req.file.location,
        key: req.file.key,
    });
});

module.exports = router;