import mongoose from "mongoose";


const affiliateStatSchema = new mongoose.Schema({
   userId:{type:mongoose.Types.ObjectId, ref:"user"},
   affiliateSales:{
    type:[mongoose.Types.ObjectId],
    ref:"transaction"
   }
}, {timestamps: true});

const affiliateStatModel = mongoose.model('affiliateStat', affiliateStatSchema);
export default affiliateStatModel;