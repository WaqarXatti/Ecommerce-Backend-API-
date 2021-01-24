const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const warehouseschema = new Schema({

    warehousename : String,
    warehouselocation:String,

})


const warehouse = mongoose.model('Warehouse' , warehouseschema);

module.exports = warehouse;