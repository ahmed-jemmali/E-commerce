const express = require('express');
const router = express.Router();
const ProductAchat = require('../models/productAchat');
const _ = require('lodash');

const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

//add-productAchat
router.post('/addProductAchat',auth.authenticateToken,checkRole(['super admin','stock manager']), (req, res) => {
    const {name,quantity, description, categoryId} = req.body;
    if (name == null || quantity == null || description == null || categoryId == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    ProductAchat.findOne({name, categoryId}).exec((err, result) => {
        if (result) {
            return res.status(400).json({message: "Can not have multiple product with the same name and category"})
        }
        const productAchat = new ProductAchat({
            name,
            quantity,
            description,
            categoryId
        });
        try {
            productAchat.save();
            return res.status(200).json({
                message: "Product added successfully"
            });
        } catch (err) {
            console.log("Error : ", err);
            return res.status(500).json(err);
        }
    });
});

//get-all-productAchats
router.get('/allProductAchats', auth.authenticateToken,checkRole(['super admin','stock manager']),(req, res) => {
    ProductAchat.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            return res.status(200).json(docs);
        }
    });
});

//get-productAchatById
router.get('/getProductAchat/:id',auth.authenticateToken,checkRole(['super admin','stock manager']), (req, res) => {
    ProductAchat.findOne({_id: req.params.id})
        .then((result) => {
            if (!result) {
                return res.status(404).json({message: "Product does not found"})
            }
            return res.status(200).json(result);
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })
});

//getProductAchatByCategory
router.get('/getProductAchatByCategory/:name',auth.authenticateToken, checkRole(['super admin','stock manager']),(req, res) => {
    ProductAchat.find({categoryId: req.params.name})
        .then((result) => {
            if (!result) {
                return res.status(404).json({message: "Product does not found"})
            }
            // if (result.status === false) {
            //     console.log("Product Status : ", result.status);
            //     return res.status(401).json({
            //         error: 'Unable to give away product',
            //         success: false
            //     });
            // }
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })


});


//delete-productAchat
router.delete('/deleteProductAchat/:id', auth.authenticateToken,checkRole(['super admin','stock manager']),(req, res) => {
    ProductAchat.deleteOne({_id: req.params.id})
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({message: "Product does not found"})
            }
            return res.status(200).json({message: "Product Deleted successfully"})
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })
});


//edit-product
router.put('/updateProductAchat/:id',auth.authenticateToken,checkRole(['super admin','stock manager']), (req, res) => {
    const {_id, name,quantity, description, status, categoryId} = req.body;
    if (name == null || quantity == null || description == null || categoryId == null) {
        return res.status(400).json({message: 'missing parameters'});
    }

    ProductAchat.find({name, categoryId}).exec((err, result) => {
        if (err) {
            return res.status(500).json(err)
        }
        const others = result.filter(product => product._id.toHexString() !== _id);
        if (others.length > 0) {
            return res.status(400).json({message: "Can not have multiple product with the same name and category"})
        }
        const newProductAchat = new ProductAchat({
            _id,
            name,
            quantity,
            description,
            status,
            categoryId
        });

        ProductAchat.updateOne({_id}, newProductAchat)
            .then((result) => {
                if (result.matchedCount === 0) {
                    return res.status(400).json({message: 'Product does not exist'})
                }
                return res.status(200).json({message: 'Product updated successfully'})
            })
            .catch((err) => {
                console.log("Error : ", err);
                return res.status(500).json(err);
            });
    })
});

//updateProductQuantity
router.put('/updateProductQuantity', auth.authenticateToken, checkRole(['super admin', 'purchase manager']), (req, res) => {
    console.log("req.body : ", req.body);
    const quantity = req.body;
    if (quantity.length === 0) {
        return res.status(400).json({message: 'missing parameters'});
    }
    for (const quantityElement of quantity) {
        const newProduct = new ProductAchat({
            _id: quantityElement._id,
            quantity: quantityElement.quantity,
        });
        console.log("newProduct : ",newProduct);
        ProductAchat.updateOne({_id: quantityElement._id}, newProduct)
            .then((result) => {
                if (result.matchedCount === 0) {
                    console.log('Product does not exist');
                    return res.status(404).json({message: 'Product does not exist'})
                }
                console.log('Quantity updated successfully');
                // res.status(200).json({message: 'Quantity updated successfully'})
            })
            .catch((err) => {
                console.log("Error in change quantity: ", err);
                return res.status(500).json(err);
            });
    }
});


//Change Product Status
router.put('/changeProductAchatStatus/:id',auth.authenticateToken, checkRole(['super admin','stock manager']),function (req, res) {

    console.log("id : ", req.params.id);
    console.log("Here into changeStatus : ", req.body);

    ProductAchat.findOne({_id: req.params.id}, (err, product) => {
        if (err || !product) {
            return res.status(404).json({message: "Product with this id does not found."})
        }
        console.log("product : ", product);

        const obj = {
            status: req.body.status
        };
        console.log("new obj : ", obj);

        newProductAchat = _.extend(product, obj);
        console.log("newProduct : ", newProductAchat);

        newProductAchat.save((err, result) => {
            if (err) {
                console.log("error : ", err);
                return res.status(500).json(err);
            } else {
                console.log('result :', result);
                return res.status(200).json({message: 'Product status updated successfully'});
            }
        });

    });

});


module.exports = router;