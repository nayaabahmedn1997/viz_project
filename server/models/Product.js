import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number
}, {timestamps: true});


const productModel = mongoose.model('product', productSchema);

export default productModel;