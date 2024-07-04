const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { isLoggedIn } = require('../middleware')
const Product = require('../models/Product')

// to see the cart
router.get('/user/cart', isLoggedIn, async (req, res)=>{
    let user = await User.findById(req.user._id).populate('cart')

    const totalAmount = user.cart.reduce((sum , curr)=> sum+curr.price , 0)
    const productInfo = user.cart.map((p)=>p.desc).join(',');

    res.render('cart/cart', {user, totalAmount, productInfo})
})


// actually adding the product to the cart
router.post('/user/:productId/add', isLoggedIn, async (req, res)=>{
    let userId = req.user._id
    let {productId} = req.params

    let product = await Product.findById(productId)
    let user = await User.findById(userId)

    user.cart.push(product)
    await user.save()

    req.flash('success', 'Product added to cart succesfully')
    res.redirect('/user/cart')
})

module.exports = router