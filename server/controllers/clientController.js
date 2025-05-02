import productModel from "../models/Product.js"
import productStatModel from "../models/ProductStat.js"
import transactionModel from "../models/Transaction.js";
import userModel from "../models/userModel.js";
import getCountryISO3 from "country-iso-2-to-3"
export const getProducts = async(req,res) =>{
    try {
        const products = await productModel.find();
        const productWithStats = await Promise.all(
            products.map(async (product)=>{
                const stat = await productStatModel.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat
                }
            })
        )  
        return res.status(200).json(productWithStats)      
    } catch (error) {
        return res.status(500).json({
            error:`${error.message}`
        })
    }
}


export const getCustomers = async(req,res) =>{
    try {
        const customers = await userModel.find({role:"user"}).select("-password");
        return res.status(200).json(customers)      
    } catch (error) {
        return res.status(500).json({
            error:`${error.message}`
        })
    }
}

export const getTransactions = async(req,res) =>{
    try {
        const {
             page = 1,
             pageSize =2,
             sort = null,
             search = ""          
            }  = req.query;
        
        // formatted sort should look like {userId: -1}
        const generatedSort = () =>{
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc"? 1 : -1)
            };
            return sortFormatted;
        }

        const sortFormatted = Boolean(sort) ? generatedSort(): {};
        console.log(sortFormatted)
        const transactions = await transactionModel.find({
            $or:[
                {cost:{$regex: new RegExp(search, "i")}},
                {userId:{$regex: new RegExp(search, "i")}},
            ]
        })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);
        const total = await transactionModel.countDocuments({
            userId: { $regex: search, $options: "i" },
          });

        res.status(200).json({
            transactions,
            total
        })

    } catch (error) {
        return res.status(500).json({
            error:`${error.message}`
        })
    }
}

export const getGeography = async(req,res) =>{
    try {
      const users = await userModel.find();
    
      const mappedLocations = users.reduce((acc, {country})=>{
        const countryIso = getCountryISO3(country);
        if(!acc[countryIso])
        {
            acc[countryIso] = 0;
        }
        acc[countryIso]++;
        return acc;
      }, {})

      const formattedLocations = 
      Object.entries(mappedLocations).map(([country, count])=>{
        return {id:country, value: count}
      })
      return res.status(200).json(formattedLocations);
      
    } catch (error) {
        return res.status(500).json({
            error:`${error.message}`
        })
    }
}
