
import overallStatModel from "../models/overallStat.js";
import transactionModel from "../models/Transaction.js";
import userModel from "../models/userModel.js";
import fs from 'fs';

export const getUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const user =await  userModel.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            "message":`${error.message}`
        })
    }
}

export const getDashboard = async(req, res)=>{
    try {
       // hardcoded values
       const currentMonth = "November";
       const currentYear = 2021;
       const currentDay = "2021-11-13T00:00:00.000Z";

    //    Recent transactions
    const transactions = await transactionModel.find().limit(50).sort({createdOn: -1});

    // Overall Stats
    const overallStat = await overallStatModel.find({year: currentYear});


    const {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        dailyData
    } = overallStat[0];
    // fs.writeFile('data.json', JSON.stringify(overallStat[0], null, 2), (err) => {
    //     if (err) {
    //         console.error("An error occurred:", err);
    //       } else {
    //         console.log("Data written to file successfully");
    //       }
    //     });
    const thisMonthStats = monthlyData.find(({ month }) => {
        return month === currentMonth;
      });
  
      const todayStats = dailyData.find(({ date }) => {
        const date1 = new Date(date);
        const date2 = new Date(currentDay);
        return date1 === date2;
      });
      


      return res.status(200).json({
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats: todayStats?todayStats:{},
        transactions,
      });

    } catch (error) {
        return res.status(500).json({
            "message":`${error.message}`
        })
    }
}
