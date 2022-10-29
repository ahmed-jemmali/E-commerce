const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const _ = require('lodash');

const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

//add-product
router.post('/addProduct', auth.authenticateToken, checkRole(['super admin', 'stock manager']), (req, res) => {
    const {name, description, price, quantity, categoryId} = req.body;
    if (name == null || description == null || price == null || quantity == null || categoryId == null) {
        return res.status(400).json({message: 'missing parameters'});
    }

    Product.findOne({name, categoryId}).exec((err, result) => {
        if (result) {
            return res.status(400).json({message: "Can not have multiple product with the same name and category"})
        }
        const product = new Product({
            name,
            description,
            price,
            quantity,
            categoryId,
        });

        try {
            product.save();
            return res.status(200).json({
                message: "Product added with successfully"
            });
        } catch (err) {
            console.log("Error : ", err);
            return res.status(500).json(err);
        }
    });
});


//get-all-products
router.get('/allProducts', auth.authenticateToken, checkRole(['super admin', 'stock manager']), (req, res) => {
    Product.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            return res.status(200).json(docs);
        }
    });
});


//get-productById
router.get('/getProduct/:id', auth.authenticateToken, checkRole(['super admin', 'stock manager']), (req, res) => {
    Product.findOne({_id: req.params.id})
        .then((result) => {
            if (!result) {
                return res.status(404).json({message: "Product does not found."})
            }
            return res.status(200).json(result);
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })
});


//getProductByCategory
router.get('/getProductByCategory/:name', auth.authenticateToken, checkRole(['super admin', 'stock manager']), (req, res) => {
    Product.find({categoryId: req.params.name})
        .then((result) => {
            console.log("result : ", result);
            if (!result) {
                return res.status(404).json({message: "Product does not found."})
            }
            const product = [];
            for (const resultElement of result) {
                if (resultElement.quantity > 0) {
                    product.push(resultElement);
                }
            }
            console.log("product : ", product);
            return res.status(200).json(product)
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })

});


//delete-product
router.delete('/deleteProduct/:id', auth.authenticateToken, checkRole(['super admin', 'stock manager']), (req, res) => {
    Product.deleteOne({_id: req.params.id})
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({message: "Product does not found"})
            }
            return res.status(200).json({message: "Product Deleted successfully."})
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })
});


//updateProduct
router.put('/updateProduct/:id', auth.authenticateToken, checkRole(['super admin', 'stock manager']), (req, res) => {
    const {_id, name, description, price, quantity, status, categoryId} = req.body;
    console.log("req.body : ", req.body);
    if (name == null || description == null || price == null || quantity == null || categoryId == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    //critère
    Product.find({name, categoryId}).exec((err, result) => {
        if (err) {
            return res.status(500).json(err)
        }
        const others = result.filter(product => product._id.toHexString() !== _id);
        if (others.length > 0) {
            return res.status(400).json({message: "Can not have multiple product with the same name and category"})
        }

        const newProduct = new Product({
            _id,
            name,
            description,
            price,
            quantity,
            status,
            categoryId
        });
        console.log("newProduct : ",newProduct);
        Product.updateOne({_id}, newProduct)
            .then((result) => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({message: 'Product does not exist'})
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
router.put('/updateProductQuantity', auth.authenticateToken, checkRole(['super admin', 'sales manager']), (req, res) => {
    console.log("req.body : ", req.body);
    const quantity = req.body;
    if (quantity.length === 0) {
        return res.status(400).json({message: 'missing parameters'});
    }
    for (const quantityElement of quantity) {
        const newProduct = new Product({
            _id: quantityElement._id,
            quantity: quantityElement.quantity,
        });
        console.log("newProduct : ",newProduct);
        Product.updateOne({_id: quantityElement._id}, newProduct)
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
router.put('/changeProductStatus/:id', auth.authenticateToken, checkRole(['super admin', 'stock manager']), function (req, res) {

    console.log("id : ", req.params.id);
    console.log("Here into changeStatus : ", req.body);

    Product.findOne({_id: req.params.id}, (err, product) => {
        if (err || !product) {
            return res.status(404).json({message: "Product with this id does not found."})
        }
        console.log("product : ", product);

        const obj = {
            status: req.body.status
        };
        console.log("new obj : ", obj);

        newProduct = _.extend(product, obj);
        console.log("newProduct : ", newProduct);

        newProduct.save((err, result) => {
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