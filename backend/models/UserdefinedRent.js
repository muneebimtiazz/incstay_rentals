import mongoose from "mongoose";
// 1- create schema
// 2- model based on that schema
const rentsSchema=new mongoose.Schema(
{
  user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
  },
  name: String,
  type: String,
  city: String,
  country: String,
  price: Number,
  originalPrice: Number,
  location: String,
  email: String,
  guestFavorite: Boolean,
  maxGuests: Number,
  bedrooms: Number,
  beds: Number,
  bathrooms: Number,
  contact: String,
  description: String,
  amenities: [String],
  images: [String],
  createdAt:{
    type:Date,
    default:Date.now
  },
},{timestamps:true}
)

export default mongoose.model("UserdefinedRent", rentsSchema); 