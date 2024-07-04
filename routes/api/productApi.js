const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middleware')
const User = require('../../models/User');


router.post('/products/:productId/like', isLoggedIn, async (req, res) => {

    try{
        let { productId } = req.params;
    let user = req.user;
    let isLiked = user.wishList.includes(productId);

    // if(isLiked){
    //     User.findByIdAndUpdate(req.user._id , {$pull:{wishList:productId}})
    // }else{
    //     User.findByIdAndUpdate(req.user._id , {$addToSet:{wishList:productId}})
    // }

    const option = isLiked ? '$pull' : '$addToSet';
    //the below code can be done by else if as well
    req.user = await User.findByIdAndUpdate(req.user._id, { [option]: { wishList: productId } }, { new: true })
    res.send('like done api');
    }

    catch(e){
        res.redirect('/login')
    }

    
})


module.exports = router;