const express = require('express');
const router = express.Router();
const SupplierCategory = require('../models/supplierCategory');
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

//add-supplierCategory
router.post('/addSupplierCategory',auth.authenticateToken,checkRole(['super admin','purchase manager']), (req, res) => {
    const {name} = req.body;
    if (name == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    SupplierCategory.findOne({name}).exec((err, result) => {
        if (result) {
            return res.status(400).json({message: "Supplier Category already exists"})
        }
        const newSupplierCategory = new SupplierCategory({
            name: req.body.name
        });
        try {
            newSupplierCategory.save();
            return res.status(200).json({message: "Supplier Category added successfully"});
        } catch (err) {
            console.log("Error : ", err);
            return res.status(500).json(err);
        }
    });
});

//get-all-SupplierCategories
router.get('/allSupplierCategories',auth.authenticateToken,checkRole(['super admin','purchase manager']), (req, res) => {
    SupplierCategory.find((err, docs) => {
        if (err) {
            console.log("Error : ", err);
            return res.status(500).json(err);
        } else {
            return res.status(200).json(docs);
        }
    });
});

//get-SupplierCategoryById
router.get('/getSupplierCategory/:id',auth.authenticateToken, checkRole(['super admin','purchase manager']),(req, res) => {
    SupplierCategory.findOne({_id: req.params.id})
        .then((result) => {
            if (!result) {
                return res.status(404).json({message: "Supplier Category does not found"})
            }
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })

});

//delete-SupplierCategory
router.delete('/deleteSupplierCategory/:id', auth.authenticateToken,checkRole(['super admin','purchase manager']),(req, res) => {
    SupplierCategory.deleteOne({_id: req.params.id})
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({message: "Supplier Category does not found"})
            }
            return res.status(200).json({message: "Supplier Category deleted successfully"})
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })
});


//update-SupplierCategory
router.put('/updateSupplierCategory/:id',auth.authenticateToken, checkRole(['super admin','purchase manager']),(req, res) => {
    const {_id, name} = req.body;
    if (name == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    SupplierCategory.findOne({name}).exec((err, result) => {
        if (err) {
            console.log("Error : ", err);
            return res.status(500).json(err)
        }
        if (result) {
            return res.status(400).json({message: "Supplier Category already exists"})
        }
        const newSupplierCategory = new SupplierCategory({
            _id,
            name
        });
        SupplierCategory.updateOne({_id}, newSupplierCategory)
            .then((result) => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({message: 'Supplier Category does not exist'})
                }
                return res.status(200).json({message: 'Supplier Category updated successfully'})
            })
            .catch((err) => {
                console.log("Error : ", err);
                return res.status(500).json(err);
            })

    });
});


module.exports = router;