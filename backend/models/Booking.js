import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema(
    {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PredefinedRent",
        required:true
    },

    totalPrice:{
        type:Number,
        required:true
    },
    checkIn:{
        type:Date,
        required:true
    },
    checkOut:{
        type:Date,
        required:true
    },
},{timestamps:true}
)

export default mongoose.model('Booking',bookingSchema)