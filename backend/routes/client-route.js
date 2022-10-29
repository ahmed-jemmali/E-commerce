const express = require('express');
const router = express.Router();
const Client = require('../models/client');

const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

//add-Client
router.post('/addClient',auth.authenticateToken,checkRole(['super admin','sales manager']), (req, res) => {
    const {name, address, contactNumber, email} = req.body;
    if (name == null || address == null || contactNumber == null || email == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    Client.findOne({email}).exec((err, result) => {
        if (result) {
            return res.status(400).json({message: "Can not have multiple client with the same email"})
        }
        const client = new Client({
            name,
            address,
            contactNumber,
            email,
        });
        try {
            client.save();
            return res.status(200).json({message: "Client added successfully"});
        } catch (err) {
            return res.status(500).json(err);
        }
    });
});

//get-all-Clients
router.get('/allClients',auth.authenticateToken,checkRole(['super admin','sales manager']), (req, res) => {
    Client.find((err, docs) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json(docs);
        }
    });
});

//get-ClientById
router.get('/getClient/:id',auth.authenticateToken,checkRole(['super admin','sales manager']),(req, res) => {
    Client.findOne({_id: req.params.id})
        .then((result) => {
            if (!result) {
                return res.status(404).json({message: "Client does not exist"})
            }
            return res.status(200).json(result)
        })
        .catch((err) => {
            return res.status(500).json(err);
        })

});

//delete-client
router.delete('/deleteClient/:id',auth.authenticateToken,checkRole(['super admin','sales manager']),(req, res) => {
    Client.deleteOne({_id: req.params.id})
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({message: "Client does not found"})
            }
            return res.status(200).json({message: "Client Deleted successfully"});
        })
        .catch((err) => {
            return res.status(500).json(err);
        })
});

//update-Client
router.put('/updateClient/:id', auth.authenticateToken,checkRole(['super admin','sales manager']),(req, res) => {
    const {_id, name, address, contactNumber, email} = req.body;
    if (name == null || address == null || contactNumber == null || email == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    Client.find({email}).exec((err, result) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (result.length !== 0) {
            const others = result.filter(client => client._id.toHexString() !== _id);
            if (others.length > 0) {
                return res.status(400).json({message: "Can not have multiple client with the same email"})
            }
        }
        const newClient = new Client({
            _id,
            name,
            address,
            contactNumber,
            email,
        });
        Client.updateOne({_id}, newClient)
            .then((result) => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({message: 'Client does not exist'})
                }
                return res.status(200).json({message: 'Client updated successfully'});
            })
            .catch((err) => {
                return res.status(500).json(err);
            })
    });
});

module.exports = router;