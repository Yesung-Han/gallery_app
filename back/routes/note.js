const express = require('express');
const router = express.Router();
const Note = require('../models').Note;

router.get('/',(req, res,next)=>{
    Note.findOne({})
        .then((note)=>{
            if(note){
                res.status(200).json({
                    result: true,
                    data: note
                });
            }
            else{
                res.status(200).json({
                    result: false,
                });
            }
        })
        .catch(err=>{
            console.log(err);
            next(err);
        })
})

router.post('/',(req, res, next)=>{
    Note.findOne({})
        .then(note=>{
            if(note){
                return note.update({
                    title: req.body.title,
                    subTitle: req.body.subTitle,
                    content: req.body.content
                })
            }
            else{
                return Note.create({
                    title: req.body.title,
                    subTitle: req.body.subTitle,
                    content: req.body.content
                })
            }
        })
        .then((result)=>{
            console.log(result);
            res.status(200).send(result);
        })
        .catch((err)=>{
            console.log(err);
            next(err);
        })
})

module.exports = router;