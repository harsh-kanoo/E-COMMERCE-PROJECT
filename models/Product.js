const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    name: {
        type : String,
        trim : true,                         // inbuilt keywords of mongoose
        required : true
    }, 
    img: {
        type : String,
        trim : true
    },
    price: {
        type : Number,
        min : 0,
        required : true
    },
    desc: {
        type : String,
        trim : true
    },
    reviews:[                                         
        {
            type: mongoose.Schema.Types.ObjectId,                // id of a particular review in the review collection
            ref: 'Review'                                    // referencing with which we have to create a connection              
        }                                                   // name of schema
    ],
    avgRating:{
        type : Number,
        default : 0
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})


// creating model
let Product = mongoose.model('Product', productSchema)

//exporting -> to use it in another js file 
module.exports = Product;