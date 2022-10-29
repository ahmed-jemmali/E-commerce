const express = require('express');
const router = express.Router();
const FactureAchat = require('../models/factureAchat');

const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');
const Category = require("../models/category");

//generate-report
router.post('/generateReport',auth.authenticateToken,checkRole(['super admin','purchase manager']), (req, res) => {
    console.log("Here into generate report", req.body);

    const generatedUuid = uuid.v1();
    console.log("generateUuid : ",generatedUuid);
    const orderDetails = req.body;
    var productDetailsReport = JSON.parse(orderDetails.productDetails);

    const factureAchat = new FactureAchat({
        uuid: generatedUuid,
        name: orderDetails.name,
        address: orderDetails.address,
        contactNumber: orderDetails.contactNumber,
        email: orderDetails.email,
        supplierCategory:orderDetails.supplierCategory,
        total: orderDetails.totalProduct,
        productDetails: orderDetails.productDetails,
    });

    factureAchat.save((err, results) => {
        if (!err) {
            ejs.renderFile(path.join(__dirname, '', "reportAchat.ejs"), {
                productDetails: productDetailsReport,
                name: orderDetails.name,
                address: orderDetails.address,
                contactNumber: orderDetails.contactNumber,
                email: orderDetails.email,
                supplierCategory:orderDetails.supplierCategory,
                totalProduct: orderDetails.totalProduct,
            }, (err, results) => {
                if (err) {
                    console.log("Error : ", err);
                    return res.status(500).json(err);
                } else {
                    console.log("result : ",results);
                    pdf.create(results).toFile('./generated_pdf/' + generatedUuid + ".pdf", function (err, data) {
                        if (err) {
                            console.log("Error : ", err);
                            return res.status(500).json(err);
                        } else {
                            return res.status(200).json({uuid: generatedUuid});
                        }
                    });
                }
            });
        } else {
            console.log("Error : ", err);
            return res.status(500).json(err);
        }
    });

});

//get-Pdf
router.post('/getPdf',auth.authenticateToken,checkRole(['super admin','purchase manager']), (req, res) => {
    const orderDetails = req.body;
    const pdfPath = './generated_pdf/' + orderDetails.uuid + '.pdf';
    if (fs.existsSync(pdfPath)) {
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    } else {
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
        ejs.renderFile(path.join(__dirname, '', "reportAchat.ejs"), {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            address: orderDetails.address,
            contactNumber: orderDetails.contactNumber,
            email: orderDetails.email,
            supplierCategory:orderDetails.supplierCategory,
            totalProduct: orderDetails.totalProduct,
        }, (err, results) => {
            if (err) {
                console.log("Error : ", err);
                return res.status(500).json(err);
            } else {
                pdf.create(results).toFile('./generated_pdf/' + orderDetails.uuid + ".pdf", function (err, data) {
                    if (err) {
                        console.log("Error : ", err);
                        return res.status(500).json(err);
                    } else {
                        res.contentType("application/pdf");
                        fs.createReadStream(pdfPath).pipe(res);
                    }
                });
            }
        });
    }
});

//get-All-FacturesAchat
router.get('/allFacturesAchat',auth.authenticateToken,checkRole(['super admin','purchase manager']), (req, res) => {
    FactureAchat.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            return res.status(200).json(docs);
        }
    });
});

//get-factureAchatById
router.get('/getFactureAchat/:id',auth.authenticateToken,checkRole(['super admin','purchase manager']), (req, res) => {
    FactureAchat.findOne({_id: req.params.id})
        .then((result) => {
            if (!result) {
                return res.status(404).json({message: "Facture with this id does not found"})
            }
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })

});

//deleteFactureAchat
router.delete('/deleteFactureAchat/:id',auth.authenticateToken,checkRole(['super admin','purchase manager']), (req, res) => {
    FactureAchat.deleteOne({_id: req.params.id})
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({message: "Facture does not found"})
            }
            return res.status(200).json({message: "Facture deleted successfully"});
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        });

});


module.exports = router;