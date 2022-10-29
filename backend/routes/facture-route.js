const express = require('express');
const router = express.Router();
const Facture = require('../models/facture');

const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');
const Category = require("../models/category");


//generate-report
router.post('/generateReport',auth.authenticateToken,checkRole(['super admin','sales manager']), (req, res) => {
    console.log("Here into generate report", req.body);

    const generatedUuid = uuid.v1();
    const orderDetails = req.body;
    var productDetailsReport = JSON.parse(orderDetails.productDetails);

    const facture = new Facture({
        uuid: generatedUuid,
        name: orderDetails.name,
        email: orderDetails.email,
        contactNumber: orderDetails.contactNumber,
        paymentMethod: orderDetails.paymentMethod,
        total: orderDetails.totalAmount,
        productDetails: orderDetails.productDetails,
        cratedBy: res.locals.email
    });

    facture.save((err, results) => {
        if (!err) {
            ejs.renderFile(path.join(__dirname, '', "report.ejs"), {
                productDetails: productDetailsReport,
                name: orderDetails.name,
                email: orderDetails.email,
                contactNumber: orderDetails.contactNumber,
                paymentMethod: orderDetails.paymentMethod,
                totalAmount: orderDetails.totalAmount
            }, (err, results) => {
                if (err) {
                    console.log("Error : ", err);
                    return res.status(500).json(err);
                } else {
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
router.post('/getPdf',auth.authenticateToken,checkRole(['super admin','sales manager']), (req, res) => {
    const orderDetails = req.body;
    const pdfPath = './generated_pdf/' + orderDetails.uuid + '.pdf';
    if (fs.existsSync(pdfPath)) {
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    } else {
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
        ejs.renderFile(path.join(__dirname, '', "report.ejs"), {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount
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


//get-All-Factures
router.get('/allFactures',auth.authenticateToken,checkRole(['super admin','sales manager']), (req, res) => {
    Facture.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            return res.status(200).json(docs);
        }
    });
});


//get-factureById
router.get('/getFacture/:id',auth.authenticateToken,checkRole(['super admin','sales manager']), (req, res) => {
    Facture.findOne({_id: req.params.id})
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

//deleteFacture
router.delete('/deleteFacture/:id',auth.authenticateToken,checkRole(['super admin','sales manager']), (req, res) => {
    Facture.deleteOne({_id: req.params.id})
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





//db.collectionName.distinct("id")
//MyModel.find().distinct("id")
//db.collectionName.count({product:"prod1"})

// router.get('/count/:email', (req, res) => {
//     console.log("Here in get all clients");
//     Facture.count({email:req.params.email},(err, docs) => {
//         if (err) {
//             console.log("Error :", err);
//             return res.status(500).json(err);
//         } else {
//             return res.status(200).json(docs);
//         }
//     });
// });


// db.universities.aggregate([
//     { $unwind : '$students' },
//     { $count : 'total_documents' }
// ]).pretty()

// router.get('/allClients', (req, res) => {
//     console.log("Here in get all clients");
//     Facture.aggregate([
//         { $match:{}},
//         { $project : {_id:1,name:1, email:1, contactNumber:1,total:1} },
//         { $group : { _id : '$email', totalAmount : { $sum : '$total' },contactNumber: { $push: "$contactNumber" },name: { $push: "$name" },id: { $push: "$_id" }  } },]).exec((err, docs) => {
//         if (err) {
//             console.log("Error :", err);
//             return res.status(500).json(err);
//         } else {
//             Facture.find((err,result)=>{
//                 if (err) {
//                     console.log("Error :", err);
//                     return res.status(500).json(err );
//                 } else {
//                     const data = {
//                         docs:docs,
//                         result:result
//                     }
//                     return res.status(200).json(data);
//                 }
//             });
//         }
//     });
// });


module.exports = router;