// Import express module
const express = require('express');
// Create express backend application
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const userRoute = require('./routes/user-route');
const factureRoute = require('./routes/facture-route');
const roleRoute = require('./routes/role-route');
const categoryRoute = require('./routes/category-route');
const productRoute = require('./routes/product-route');
const dashboardRoute = require('./routes/dashboard-route');
const supplierCategoryRoute = require('./routes/supplierCategory-route');
const supplierRoute = require('./routes/supplier-route');
const achatRoute = require('./routes/achat-route');
const productAchatRoute = require('./routes/productAchat-route');
const clientRoute = require('./routes/client-route');
const manageImageRoute = require('./routes/manageImage-route');

// Import mongoose module
const mongoose = require('mongoose');
//Connection with database ;// avec : erp-modulaire-saas : nom de database
mongoose.connect(process.env.DATABASE,
    {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if (err) {
            console.error('Error : ' + err);
        } else {
            console.log('Connected to mongodb');
        }
    }
);

// Import body-parser module
const bodyParser = require('body-parser');

// Get and parse object from request 
app.use(bodyParser.urlencoded({extended: true}));
// Make JSON object to send 
app.use(bodyParser.json());

// Security Configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

app.use("/images", express.static(path.join("images")));

app.use('/api/users', userRoute);
app.use('/api/factures', factureRoute);
app.use('/api/roles', roleRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/supplierCategories', supplierCategoryRoute);
app.use('/api/suppliers', supplierRoute);
app.use('/api/achats', achatRoute);
app.use('/api/productAchats', productAchatRoute);
app.use('/api/clients', clientRoute);
app.use('/api/manageImages', manageImageRoute);


module.exports = app;
