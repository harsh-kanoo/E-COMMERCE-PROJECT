const express = require('express')
const Review = require('../models/Review')
const Product = require('../models/Product')
const router = express.Router()
const {validateReview, isLoggedIn} = require('../middleware')


router.post('/products/:id/review', isLoggedIn, validateReview, async (req, res) => {

    try { 
        // console.log(req.body)
        let { rating, comment } = req.body
        let { id } = req.params
        let product = await Product.findById(id)

        let newReview = new Review({ rating, comment })

        // Average Rating Logic
        const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));
        
        await newReview.save()
        await product.reviews.push(newReview)              // objectId of document is pushed automatically, not the whole object
        await product.save()

        req.flash('success', 'Review added succesfully')
        res.redirect(`/products/${id}`)
    }

    catch (e) {
        res.status(500).render('product/error', { err: e.message })
    }
})


module.exports = router