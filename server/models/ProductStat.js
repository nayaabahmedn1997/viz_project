import mongoose from "mongoose";


const monthlyDataSchema = new mongoose.Schema({
    month: String,
    totalSales: Number,
    totalUnits: Number
});

const dailyDataSchema = new mongoose.Schema({
    date: Date,
    totalSales: Number,
    totalUnits: Number
});


const productStatSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    yearlySalesTotal:Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [monthlyDataSchema],
    dailyData: [dailyDataSchema],

}, {timestamps: true});

const productStatModel = mongoose.model('productStat', productStatSchema);
export default productStatModel;