var express = require('express');
var router = express.Router();

var db = require('../queries')

router.get('/api/getAllProducts', db.getAllProducts);
router.get('/api/getSingleProduct/:product_id', db.getSingleProduct);
router.post('/api/createProduct', db.createProduct);
router.put('/api/updateProduct/:product_id', db.updateProduct);
router.delete('/api/removeProduct/:product_id', db.removeProduct);


module.exports = router;
