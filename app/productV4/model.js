const mongoose = require ('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'field name harus diiisi'],
        minLenght: 3,
        maxLenght: 50
    },
    price: {
        type: Number,
        required: true,
        min: 1000,
        max: 10000000000
    },
    stock: {
        type: Number,
        default:0
    },
    
    status: {
        type: Boolean,
        default: true
    },
    image_url: {
        type: String,
    }
        
});

const product = mongoose.model('Product', productSchema)
module.exports = product;