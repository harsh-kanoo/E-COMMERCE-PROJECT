const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const seedDB = require('./seed')
const methodOverride = require('method-override')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session');
const flash = require('connect-flash')

//ENV
const dotenv = require('dotenv');
dotenv.config();

// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/User')


const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes')
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')
const productApi = require('./routes/api/productApi');


app.use(express.urlencoded({ extended: true }))               // for parsing form data (middleware)

// METHOD OVERRIDING (PATCH)
app.use(methodOverride('_method'))

 
//setting templates
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//setting static files
app.use(express.static(path.join(__dirname, 'public')))


//database connection
mongoose.set('strictQuery', true)                                 // version 7 ki vajah se
mongoose.connect(process.env.dbURL)         // returns a promise
.then(()=>{console.log('DB CONNECTED')})
.catch((err)=>{console.log('error in DB', err)})


let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie : {                            //added from here for session expiry
        httpOnly : true,
        expires : Date.now() + 1000*60*60*24*7,              // for 7 days
        maxAge : 1000*60*60*24*7
    }

}

app.use(session(configSession));
app.use(flash());

// PASSPORT

// to initialize passport for using it and storing in session
app.use(passport.initialize());       
app.use(passport.session());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());            // keep the user logged in for a fixed time, and stores its data in session
passport.deserializeUser(User.deserializeUser());          // Log Out

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// middleware for storing the value of certain variables in local storage for the whole application
// i.e currentUser = req.user for the whole app
app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    next();
})


app.get('/' , (req,res)=>{
    res.render('home');
})


// using all the routes in order to verify the path and run the function
app.use(productRoutes);
app.use(reviewRoutes)
app.use(authRoutes)
app.use(cartRoutes)
app.use(productApi)

// adding dummy data to the collection
// seedDB()



//running on Port
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server connected at port : ${PORT}`)
})