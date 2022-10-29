const express = require('express');
const router = express.Router();
const Role = require('../models/role');

const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

//addRole
router.post('/addRole', auth.authenticateToken, checkRole(['super admin']), (req, res) => {
    console.log("Here into add role", req.body);

    if (req.body.role == null) {
        return res.status(400).json({message: 'missing parameters'});
    }
    Role.findOne({role: req.body.role}).exec((err, role) => {
        if (role) {
            return res.status(400).json({message: "Role already exists."})
        }
        const newRole = new Role({
            role: req.body.role
        });

        try {
            newRole.save();
            return res.status(200).json({message: 'Role added successfully'});

        } catch (err) {
            console.log("Error : ", error);
            return res.status(500).json(err);
        }
    });
});

//getAllRoles
router.get('/allRoles', (req, res) => {
    console.log("Here in get all roles");
    Role.find((err, docs) => {
        if (err) {
            console.log("Error :", err);
            return res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    })
});


//deleteRole
router.delete('/deleteRole/:id', auth.authenticateToken, checkRole(['super admin']), (req, res) => {
    console.log("Here into delete role", req.params.id);
    Role.deleteOne({_id: req.params.id})
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({message: "Role does not found"})
            }
            return res.status(200).json({message: "Role deleted successfully."})
        })
        .catch((err) => {
            console.log("Error : ", err);
            return res.status(500).json(err);
        })

});


module.exports = router;
