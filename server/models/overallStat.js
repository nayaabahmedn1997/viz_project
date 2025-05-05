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


const overallStatSchema = new mongoose.Schema({
    totalCustomers : Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData:[monthlyDataSchema],
    dailyData:[dailyDataSchema],
    salesByCategory: {
        type: Map,
        of: Number
    }
}, {timestamps: true});

const overallStatModel = mongoose.model('overallStat', overallStatSchema);
export default overallStatModel;