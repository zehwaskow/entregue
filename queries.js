var promise = require('bluebird');


var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://ze:8904@localhost:5432/entreguedb';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllProducts: getAllProducts,
  getSingleProduct: getSingleProduct,
  createProduct: createProduct,
  updateProduct: updateProduct,
  removeProduct: removeProduct, 
};


function getAllProducts(req, res, next) {
  db.any('SELECT * FROM product')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
        });
    })
    .catch(function (err) {
      return next(err);
    })
}


function getSingleProduct(req, res, next) {
  var product_id = parseInt(req.params.product_id);
  db.one('SELECT * FROM product WHERE product_id = $1', product_id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data   
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createProduct(req, res, next) {
  req.body.stock = parseInt(req.body.product_stock);
    db.none('INSERT INTO product(product_name, product_brand, product_stock, product_price, product_image)'+
    'values(${product_name}, ${product_brand}, ${product_stock}, ${product_price}, ${product_image})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted Product Successfully'
        });
    }) 
    .catch(function (err) {
      return next(err);
    });   
}

function updateProduct(req, res, next) {
  db.none('UPDATE product SET product_name=$1, product_brand=$2,' 
    +'product_stock=$3, product_price=$4, product_image=$5 WHERE product_price = $6',
      [req.body.product_name, req.body.product_brand, parseInt(req.body.product_stock), 
        req.body.product_price,req.body.product_image, parseInt(req.params.product_id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Product Updated Successfully'
        });
    })
    .catch(function (err) {
      return next(err);
    });       
}

function removeProduct(req, res, next) {
  var product_id = parseInt(req.params.product_id);
  db.result('DELETE FROM product WHERE product_id = $1', product_id)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Product Removed`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
