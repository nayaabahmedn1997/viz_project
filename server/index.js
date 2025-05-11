import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
/* ROUTES IMPORT */
import clientRoutes from "./routes/clientRoutes.js";
import generalRoutes from "./routes/generalRoutes.js";
import managementRoutes from "./routes/managementRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import userModel from './models/userModel.js';
import { dataProduct, dataProductStat, dataTransaction, dataUser, dataOverallStat, dataAffiliateStat } from './data/index.js';
import productModel from './models/Product.js';
import productStatModel from './models/ProductStat.js';
import transactionModel from './models/Transaction.js';
import overallStatModel from './models/overallStat.js';
import affiliateStatModel from './models/AffiliateStat.js';
;

/* DATA IMPORTS */


/* Configuration */
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


// Recreate __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/* MONGOOSE SETUP */
const PORT  = process.env.PORT || 9000;
try {
    console.log(process.env.MONGO_URI)
    mongoose.connect(process.env.MONGO_URI);
   console.log("MongoDB successfully connected");
//    ONLY ADD DATA ONE TIME
//await userModel.insertMany(dataUser);
//await productModel.insertMany(dataProduct);
//await productStatModel.insertMany(dataProductStat);
//await transactionModel.insertMany(dataTransaction);
//await overallStatModel.insertMany(dataOverallStat);
//await affiliateStatModel.insertMany(dataAffiliateStat);
} catch (error) {
    console.log(`Error in connecting to database ${error}`);
    process.exit(1);
}
// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve React frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})
