import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 2,
        max:100
    },
    email:{
        type: String,
        required: true,
        min: 2,
        max:50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 5
    },
    city:{
        type: String
    },
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transaction: Array,
    role:{
        type: String,
        enum :["user", "admin", "superadmin"],
        default:"admin"
    }

},{
    timestamps: true
});

const userModel = mongoose.model('user',userSchema);

export default userModel;