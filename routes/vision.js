require('dotenv').config();
const fs = require('fs')
const express = require("express");
const router = express.Router();
const multer = require('multer');
const vision = require('@google-cloud/vision');

const upload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.substring(0, file.originalname.lastIndexOf("."))
                    .toLowerCase()
                    .split(" ")
                    .join("-");
        const ext = file.mimetype.substring(file.mimetype.indexOf("/")+1);
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});


router.post("/upload/printed", multer({ storage: upload}).single("imageData"), (req, res) => {
    if(req.file) {
        textDetection(req.file.filename)
            .then((responseText)=>{
                fs.unlink("uploads/"+req.file.filename, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                  })
                res.status(200).json({
                    data: responseText
                })
            }).catch((err)=>{
                res.status(500).json({
                    msg: "error",
                    error: err
                })
            })
    }
    else throw 'error';    
});

router.post("/upload/written", multer({ storage: upload}).single("imageData"), (req, res) => {
    if(req.file) {
        documentTextDetection(req.file.filename)
            .then((responseText)=>{
                res.status(200).json({
                    data: responseText
                })
            }).catch((err)=>{
                res.status(500).json({
                    msg: "error",
                    error: err
                })
            })
    }
    else throw 'error';    
});

router.post("/upload", multer({ storage: upload}).single("imageData"), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else res.json({error : req.file});    
});


router.get("/*", (req, res) => {
        res.status(200).json({
            data: "Use a post request",
        });
});

async function textDetection(filename){
    console.log(filename);
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection("uploads/"+filename);
    const detections = result.textAnnotations;
    return detections[0].description;
}
    
async function documentTextDetection(filename){
    console.log(filename);
    const client = new vision.ImageAnnotatorClient();
    console.log("pont1");
    const [result] = await client.documentTextDetection("uploads/"+filename);
    const fullTextAnnotation = result.fullTextAnnotation;
    return `${fullTextAnnotation.text}`;
}


module.exports = router;
