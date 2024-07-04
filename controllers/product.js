const Product = require("../models/Product");


const showAllProducts = async (req, res) => {
    try {
        let allProducts = await Product.find()
        res.render('product/index', { allProducts })
    }
    catch (e) {
        res.status(500).render('product/error', {err:e.message})
    }
}


const productForm = (req, res) => {
    try {
        res.render('product/new')
    }
    catch (e) {
        res.status(500).render('product/error', {err:e.message})
    }
}

const createProduct = async (req, res) => {

   // console.log(req.body)
   try {
    let { name, img, price, desc } = req.body;
    await Product.create({ name, img, price, desc, author : req.user._id })

    req.flash('success', 'Product added succesfully')
    res.redirect('/products')
}
catch (e) {
    res.status(500).render('product/error', {err:e.message})
}
}

const showProduct = async(req, res) => {

    try {
        // console.log(req.params)
        let { id } = req.params

        let foundProduct = await Product.findById(id).populate('reviews');             // populate method
        res.render('product/show', {foundProduct})
    }
    catch (e) {
        res.status(500).render('product/error', {err:e.message})
    }
}

const editProductForm = async (req, res) => {
    
    try {
        let { id } = req.params
        let foundProduct = await Product.findById(id);

        res.render('product/edit', { foundProduct })
    }
    catch (e) {
        res.status(500).render('product/error', {err:e.message})
    }
}

const updateProduct = async (req, res) => {

    try {
        // console.log(req.body)

        let { name, img, price, desc } = req.body

        let { id } = req.params
        await Product.findByIdAndUpdate(id, { name, img, price, desc });

        req.flash('success', 'Product edited succesfully')
        res.redirect(`/products/${id}`)
    }
    catch (e) {
        res.status(500).render('product/error', {err:e.message})
    }
}


const deleteProduct = async (req, res) => {
    
    try {
        let { id } = req.params
        let product = await Product.findById(id)

        for (let ID of product.reviews) {
            await Review.findByIdAndDelete(ID);
        }

        await Product.findByIdAndDelete(id)
        // await Product.findByIdAndDelete(idd);                 //for showing error

        req.flash('success', 'Product deleted succesfully')
        res.redirect('/products')
    }
    catch (e) {
        // console.log(e.message);
        res.status(500).render('product/error', {err:e.message})
    }
}


module.exports = {showAllProducts , productForm , createProduct , showProduct , editProductForm , updateProduct , deleteProduct }