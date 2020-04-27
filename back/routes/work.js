const express = require('express');
const router = express.Router();
const Work = require('../models').Work;
const AWS = require('aws-sdk');

router.post('/', (req, res, next)=>{
    Work.create({
        title: req.body.title,
        material: req.body.material,
        year: req.body.year,
        height: req.body.height,
        width: req.body.width,
        showMain: false,
        url: req.body.url,
        key: req.body.key,
    })
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err)=> {
            console.log(err);
            next(err);
        });
});

router.get('/',(req, res, next)=>{
    Work.findAll({
        where: {
            year: req.query.year,
        }
    })
    .then((works)=>{
        console.log(works);
        res.json(works);
    })
    .catch((err)=>{
        console.log("111111111111");
        console.log(err);
        next(err);
    })
});

router.get('/showMain',(req, res, next)=>{
    console.log(req.session);
    Work.findAll({
        where: {
            showMain: true,
        }
    })
    .then((works)=>{
        console.log(works);
        res.json(works);
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
});

router.patch('/', (req,res,next)=>{
    console.log(req.body);
    Work.update({
        showMain: req.body.showMain
    },{
        where: {
            id: req.query.id,
        }
    })
    .then(()=>{
        Work.findAll({
            attributes: ['showMain'],
            where:{
                id:req.query.id
            }
        })
        .then((results)=>{
            console.log(results);
            res.status(201).json(results[0]);
        })
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
});

router.delete('/', (req,res,next)=>{
    Work.findAll({
        attributes: ['key'],
        where:{
            id:req.query.id,
        }
    })
    .then((works)=>{
        let s3Key = works[0].key;
        console.log("키: " + s3Key);

        let params = {
            Bucket: 'yong-suk-gallery-app',
            Key: s3Key,
        };

        AWS.config.update({
            accessKeyId: process.env.AWSAccessKeyId,
            secretAccessKey: process.env.AWSSecretKey,
            region: 'ap-northeast-2'
        });
        
        let s3 = new AWS.S3();
        s3.deleteObject(params, (err,data)=>{
            if(err){
                console.log(err);
                next(err);
            }
            else{
                console.log("s3데이터 삭제 완료!");
                console.log(data);
                Work.destroy({
                    where:{
                        id: req.query.id,
                    }
                })
                .then((result)=>{
                    res.status(201).json(result);
                });
            }
        })
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
    
})

module.exports = router;