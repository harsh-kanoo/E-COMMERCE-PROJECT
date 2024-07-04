const express = require('express')
const Product = require('../models/Product')
const Review = require('../models/Review')
const router = express.Router()                      // mini instance/application
const {validateProduct, isLoggedIn, isSeller, isProductAuthor} = require('../middleware')
const {showAllProducts, productForm , createProduct , showProduct , editProductForm , updateProduct , deleteProduct} =  require('../controllers/product')

//READ
router.get('/products', showAllProducts)

// SHOW A NEW FORM
router.get('/products/new', isLoggedIn, isSeller, productForm)

// ACTUALLY ADDING IN DATABASE
router.post('/products', validateProduct, createProduct)

//TO SHOW A PARTICULAR PRODUCT
router.get('/products/:id', isLoggedIn, showProduct)

// FORM TO EDIT A PARTICULAR PRODUCT
router.get('/products/:id/edit', isLoggedIn, isSeller, isProductAuthor, editProductForm)

// TO ACTUALLY CHANGE IN DB
router.patch('/products/:id', validateProduct, updateProduct)

// DELETE THE EXISTING PRODUCT
router.delete('/products/:id', isSeller, isProductAuthor, deleteProduct)

//export so that you can use it in app.js
module.exports = router