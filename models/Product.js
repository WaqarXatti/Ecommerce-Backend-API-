const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Productschema = new Schema({

    productname : String,
    productprice:String,

})


const product = mongoose.model('Product' , Productschema);

module.exports = product;