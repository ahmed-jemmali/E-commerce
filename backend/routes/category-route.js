const express = require('express');
const router = express.Router();
const Category = require('../models/category');

const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

//add-category
router.post('/addCategory',auth.authenticateToken,checkRole(['super admin','stock manager']), (req, res) => {
    const {name} = req.body;
    if (name == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    Category.findOne({name}).exec((err, result) => {
        if (result) {
            return res.status(400).json({message: "Can not have multiple product category with the same name"})
        }
        const newCategory = new Category({
            name: req.body.name
        });

        try {
            newCategory.save();
            return res.status(200).json({message: "Product Category added successfully"});
        } catch (err) {
            console.log("Error : ", err);
            return res.status(500).json(err);
        }
    });
});


//get-all-categories
router.get('/allCategories',auth.authenticateToken,checkRole(['super admin','stock manager']), (req, res) => {
    Category.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            return res.status(200).json(docs);
        }
    });
});

//get-categoryById
router.get('/getCategory/:id',auth.authenticateToken,checkRole(['super admin','stock manager']), (req, res) => {
    Category.findOne({_id: req.params.id})
        .then((result) => {
            if (!result) {
                return res.status(404).json({message: "Product Category does not found"})
            }
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })


});


//delete-category
router.delete('/deleteCategory/:id',auth.authenticateToken,checkRole(['super admin','stock manager']), (req, res) => {
    Category.deleteOne({_id: req.params.id})
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({message: "Product Category does not found"})
            }
            return res.status(200).json({message: "Product Category deleted successfully"})
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })
});


//update Category
router.put('/updateCategory/:id',auth.authenticateToken,checkRole(['super admin','stock manager']), (req, res) => {
    const {_id, name} = req.body;
    if (name == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    Category.findOne({name}).exec((err, result) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (result) {
            return res.status(400).json({message: "Can not have multiple product category with the same name"})
        }
        const newCategory = new Category({
            _id,
            name
        });
        Category.updateOne({_id}, newCategory)
            .then((result) => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({message: 'Product Category does not exist'})
                }
                return res.status(200).json({message: 'Product Category updated successfully'})
            })
            .catch((err) => {
                console.log("Error : ", err);
                return res.status(500).json(err);
            })

    });
});


module.exports = router;