const express = require('express');
const router = express.Router();

const User = require('../models/user');
const saleProduct = require('../models/product');
const saleInvoice = require('../models/facture');
const client = require('../models/client');
const purchaseProduct = require('../models/product');
const purchaseInvoice = require('../models/factureAchat');
const supplier = require('../models/supplier');

const auth = require('../services/authentication');

router.get('/details',auth.authenticateToken, (req, res) => {
    let userCount;
    let saleProductCount;
    let saleInvoiceCount;
    let clientCount;
    let purchaseProductCount;
    let purchaseInvoiceCount;
    let supplierCount;

    User.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            userCount = docs.length;
            console.log("userCount : ", userCount);
        }
    });

    saleProduct.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            saleProductCount = docs.length;
            console.log("saleProductCount : ", saleProductCount);
        }
    });

    saleInvoice.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            saleInvoiceCount = docs.length;
            console.log("saleInvoiceCount : ", saleInvoiceCount);
        }
    });

    client.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            clientCount = docs.length;
            console.log("clientCount : ", clientCount);
        }
    });

    purchaseProduct.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            purchaseProductCount = docs.length;
            console.log("purchaseProductCount : ", purchaseProductCount);
        }
    });

    purchaseInvoice.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            purchaseInvoiceCount = docs.length;
            console.log("purchaseInvoiceCount : ", purchaseInvoiceCount);
        }
    });

    supplier.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            supplierCount = docs.length;
            console.log("supplierCount : ", supplierCount);
            const data = {
                user: userCount,
                saleProduct: saleProductCount,
                saleInvoice: saleInvoiceCount,
                client: clientCount,
                purchaseProduct: purchaseProductCount,
                purchaseInvoice: purchaseInvoiceCount,
                supplier: supplierCount,
            }
            return res.status(200).json(data);
        }
    });
});

module.exports = router;