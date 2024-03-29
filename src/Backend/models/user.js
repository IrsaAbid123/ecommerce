const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
      type:String,
      required: true,
      unique: true
    },
    password:{
        type: String,
        required: true,
    },
    verificationToken : {
        type: String
    },
    addresses:[
        {
            name: String,
            mobileNo: String,
            houseNo:String,
            streetNo: String,
            landMark:String,
            city:String,
            country:String,
            postalCode:String
        }
    ],
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
}) 

const User = mongoose.model('User', userSchema);

module.exports = User