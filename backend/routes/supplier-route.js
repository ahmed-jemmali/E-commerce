const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

//add-Supplier
router.post('/addSupplier',auth.authenticateToken,checkRole(['super admin','purchase manager']), (req, res) => {
    const {name, address, contactNumber, email, categoryId} = req.body;
    if (name == null || address == null || contactNumber == null || email == null || categoryId == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    Supplier.findOne({email, categoryId}).exec((err, result) => {
        if (result) {
            return res.status(400).json({message: "Can not have multiple supplier with the same email and category"})
        }
        const supplier = new Supplier({
            name,
            address,
            contactNumber,
            email,
            categoryId,
        });

        try {
            supplier.save();
            return res.status(200).json({message: "Supplier added successfully"});
        } catch (err) {
            console.log("Error : ", err);
            return res.status(500).json(err);
        }
    });
});


//get-all-Suppliers
router.get('/allSuppliers',auth.authenticateToken,checkRole(['super admin','purchase manager']), (req, res) => {
    Supplier.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            return res.status(200).json(docs);
        }
    });
});


//get-SupplierById
router.get('/getSupplier/:id', auth.authenticateToken,checkRole(['super admin','purchase manager']),(req, res) => {
    Supplier.findOne({_id: req.params.id})
        .then((result) => {
            if (!result) {
                return res.status(404).json({message: "Supplier does not found"})
            }
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })

});


//getSupplierByCategory
router.get('/getSupplierByCategory/:name',auth.authenticateToken,checkRole(['super admin','purchase manager']), (req, res) => {
    Supplier.find({categoryId: req.params.name})
        .then((result) => {
            if (!result) {
                return res.status(404).json({message: "Supplier with this category does not found"})
            }
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        });

});


//delete-supplier
router.delete('/deleteSupplier/:id',auth.authenticateToken, checkRole(['super admin','purchase manager']),(req, res) => {
    Supplier.deleteOne({_id: req.params.id})
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({message: "Supplier does not found"})
            }
            return res.status(200).json({message: "Supplier Deleted successfully"});
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })
});


//update-Supplier
router.put('/updateSupplier/:id', auth.authenticateToken,checkRole(['super admin','purchase manager']),(req, res) => {
    const {_id, name, address, contactNumber, email, categoryId} = req.body;
    if (name == null || address == null || contactNumber == null || email == null || categoryId == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    Supplier.find({email, categoryId}).exec((err, result) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (result.length !== 0) {
            const others = result.filter(supplier => supplier._id.toHexString() !== _id);
            if (others.length > 0) {
                return res.status(400).json({message: "Can not have multiple supplier with the same email and category"})
            }
        }
        const newSupplier = new Supplier({
            _id,
            name,
            address,
            contactNumber,
            email,
            categoryId,

        });
        Supplier.updateOne({_id}, newSupplier)
            .then((result) => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({message: 'Supplier does not exist'})
                }
                return res.status(200).json({message: 'Supplier updated successfully'});
            })
            .catch((err) => {
                console.log("Error : ", err);
                return res.status(500).json(err);
            })
    });
});


module.exports = router;