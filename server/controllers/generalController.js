
import userModel from "../models/userModel.js";


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