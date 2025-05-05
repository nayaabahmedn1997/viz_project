import overallStatModel from "../models/overallStat.js"

export const getSales = async(req,res) =>{
    try {
        const overallStats = await overallStatModel.find();
        return res.status(200).json(overallStats[0])      
    } catch (error) {
        return res.status(500).json({
            error:`${error.message}`
        })
    }
}
