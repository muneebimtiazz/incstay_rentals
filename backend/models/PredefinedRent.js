import mongoose from "mongoose";

// 1- create schema
// 2- model based on that schema

const rentsSchema=new mongoose.Schema(
{
  name: String,
  slug: String,
  type: String,
  city: String,
  country: String,
  rating: Number,
  reviews: Number,
  price: Number,
  originalPrice: Number,
  location: String,
  email: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  guestFavorite: Boolean,
  maxGuests: Number,
  bedrooms: Number,
  beds: Number,
  bathrooms: Number,
  contact: String,
  description: String,
  amenities: [
    String
  ],
  images: [
    String
  ]
},{timestamps:true}
)

export default mongoose.model("PredefinedRent", rentsSchema); 