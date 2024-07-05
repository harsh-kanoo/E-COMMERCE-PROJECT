const mongoose = require('mongoose');
const Product = require('./models/Product');


let products = [
    {
        name: 'Apple MacBook Air', 
        img:'https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg',
        price: 72000,
        desc: 'Colour: Space Grey Size: 256 GB , Brand:	Apple ,Model Name:	MacBook Air ,Screen Size: 13 Inches ,Colour: Space Grey ,Hard Disk Size: 256 GB ,CPU Model: Core M Family ,RAM Memory Installed Size: 8 GB ,Operating System:	macOS 10.14 Mojave ,Special Feature: Portable ,Graphics Card Description: Integrated'
    },
    {
        name: 'boAt Rockerz 550', 
        img: 'https://d2xamzlzrdbdbn.cloudfront.net/products/c10ff349-5643-40d5-9742-bc458ffd4a8b24181240.jpg',
        price: 1999,
        desc: 'Bluetooth Headphone with 50mm Dynamic Drivers, 500mAh Battery, 20 Hours Playback, Active Voice Assistant (Army Green)'
    },
    {
        name: 'Aristocrat 45', 
        img: 'https://m.media-amazon.com/images/I/71GNdEZ3kJL._SY879_.jpg',
        price: 1240,
        desc: 'Outer Material: Polyester, Color: Grey; Capacity: 45 liters; Weight: 1000 grams; Dimensions: 60 cms x 24 cms x 36 cms (LxWxH)'
    },
    {
        name: 'Classic Fit T-Shirt', 
        img: 'https://nobero.com/cdn/shop/products/imperfectly-perfect_2010275b-2baf-4abe-8280-705ed36665b9.jpg?v=1712486632',
        price: 499,
        desc: 'Fit: Regular Fit, Fabric: 180 GSM 100% Cotton, Neck: Round Neck, Sleeve: Regular Sleeve, Pattern: Graphic Print, Length: Regular'
    },
    {
        name: 'Logitech M221 Wireless Mouse', 
        img: 'https://m.media-amazon.com/images/I/61sskFEsc0L._SX679_.jpg',   
        price: 799,
        desc: 'Silent Buttons, 2.4 GHz with USB Mini Receiver, 1000 DPI Optical Tracking, 18-Month Battery Life, Ambidextrous PC/Mac/Laptop - Charcoal Grey'
    },
    {
        name: ' Laptop Sleeve', 
        img: ' https://m.media-amazon.com/images/I/31+FHazmq3L._SX300_SY300_.jpg',
        price: 379,
        desc: 'Cover Bag Compatible for All Notebooks Such as Mac Book Pro or Air 2023-2021 M2 M1 with Front Accessories Pocket Neoprene Black'
    }
]

// db.insertMany()
async function seedDB(){
    // await Product.deleteMany({});
    await Product.insertMany(products)        // the lines in the function after await will not execute till the time all the promises 
    console.log("DATABASE SEEDED");              // (mongoose) gets resolved
}

module.exports = seedDB