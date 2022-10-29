const express = require('express');
const router = express.Router();
const User = require('../models/user');
const _ = require('lodash');

const auth = require('../services/authentication');

const multer = require('multer');

const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};

const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + "-" + Date.now() + "-welyne-" + "." + extension;
        cb(null, imgName);
    },
});

//upload Image
router.put('/uploadImage/:id',auth.authenticateToken, multer({storage: storage}).single("image"), (req, res) => {

    console.log("data : ", req.body);
    console.log("id : ", req.params.id);

    console.log("req.file.filename", req.file.filename);
    let url = req.protocol + "://" + req.get("host");

    const newUser = new User({
        _id: req.params.id,
        image: `${url}/images/${req.file.filename}`
    });

    console.log("new obj : ", newUser);
    User.updateOne({_id: req.params.id}, newUser)
        .then((result) => {
            console.log('result :', result);
            if (result.matchedCount === 0) {
                return res.status(404).json({message: 'User does not exist'})
            }
            res.status(200).json({
                message: 'Image updated successfully'
            })
        })
        .catch((err) => {
            console.log("error : ", err);
            return res.status(500).json(err);
        });

});

//deleteProfileImage
router.delete('/deleteImage/:id',auth.authenticateToken, (req, res) => {
    console.log("Here into deleteProfileImage", req.params.id);
    User.findOne({_id: req.params.id}, (err, user) => {
        if(err){
            return res.status(500).json(err)
        }
        if (!user) {
            return res.status(404).json({message: "User with this id does not exists."})
        }
        console.log("user : ", user);

        const obj = {
            image: ''
        };
        console.log("new obj : ", obj);

        const newUser = _.extend(user, obj);
        console.log("newUser : ", newUser);

        newUser.save((err, result) => {
            if (err) {
                console.log("error : ", err);
                return res.status(500).json(err);
            } else {
                console.log('result :', result);
                return res.status(200).json({message: 'Image deleted successfully'})
            }
        })
    })
});


module.exports = router;
