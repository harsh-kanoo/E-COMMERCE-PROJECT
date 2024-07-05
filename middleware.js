
const Product = require('./models/Product')
const {productSchema, reviewSchema} = require('./schema');

const validateProduct = (req, res, next)=>{
    const {name, img, price, desc} = req.body
    const {error} = productSchema.validate({name, img, price, desc})

    if(error){
        return res.status(500).render('product/error', {err : error.message})
    }
    next()
}

const validateReview = async (req, res, next)=>{
    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating, comment})

    if(error){
        // return res.status(500).render('product/error', {err : error.message})
        let { id } = req.params

        let foundProduct = await Product.findById(id).populate('reviews');             
        return res.render('product/show', {foundProduct})
    }
    next()
}

const isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'you need to login first')

        if (req.xhr) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        return res.redirect('/login')

    }
    next()
}

const isSeller = (req, res, next)=>{
    if(!req.user.role){
        req.flash('error', 'you do not have the permission')
        return res.redirect('/products')
    }
    if(req.user.role !== "seller"){
        req.flash('error', 'you do not have the permission')
        return res.redirect('/products')
    }

    next()
} 

const isProductAuthor = async (req, res, next)=>{
    let {id} = req.params;
    let product = await Product.findById(id);

    if(!product.author || !product.author.equals(req.user._id)){
        req.flash('error' , 'you are not authorised users');
        return res.redirect('/products');
    }
    next();
}

const isLikeable = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'you need to login first')
        return window.location.replace('/login');        //redirect

    }
    next()
}

module.exports = {validateProduct, validateReview, isLoggedIn, isSeller, isProductAuthor, isLikeable}