import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({

    userId: String,
    cost : String,
    products:{
        type: [mongoose.Types.ObjectId],
        of: Number
    }

}, {timestamps: true});


const transactionModel  = mongoose.model("transaction", TransactionSchema);

export default transactionModel;