import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

/* ROUTES IMPORT */
import clientRoutes from "./routes/clientRoutes.js";
import generalRoutes from "./routes/generalRoutes.js";
import managementRoutes from "./routes/managementRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import userModel from './models/userModel.js';
import { dataProduct, dataProductStat, dataTransaction, dataUser, dataOverallStat } from './data/index.js';
import productModel from './models/Product.js';
import productStatModel from './models/ProductStat.js';
import transactionModel from './models/Transaction.js';
import overallStatModel from './models/overallStat.js';


/* DATA IMPORTS */


/* Configuration */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT  = process.env.PORT || 9000;
try {
    mongoose.connect(process.env.MONGO_URI);
   console.log("MongoDB successfully connected");
//    ONLY ADD DATA ONE TIME
//await userModel.insertMany(dataUser);
//await productModel.insertMany(dataProduct);
//await productStatModel.insertMany(dataProductStat);
//await transactionModel.insertMany(dataTransaction);
//await overallStatModel.insertMany(dataOverallStat);
} catch (error) {
    console.log(`Error in connecting to database ${error}`);
    process.exit(1);
}

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})
