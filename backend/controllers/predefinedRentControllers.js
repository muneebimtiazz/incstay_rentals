import PredefinedRent from '../models/PredefinedRent.js'

export const getAllPreDefinedRents=async (req,res)=>{

   try {
      console.log('trying to get data from predefinedrents collection');
      const data=await PredefinedRent.find();
      res.status(200).json(data)
   } catch (error) {
      console.log('error in getting data from collection',error)
   }

}

export const getFilteredPreDefinedRents=async (req,res)=>{
   // console.log(req.query)
   const {city,maxGuests}=req.query
   // console.log(city,maxGuests,price)

   const filters ={};
   try {
      if(city && city !== 'null'){
        filters.city=city; 
      }
      if(maxGuests && maxGuests !== 'null'){
        filters.maxGuests={$gte:Number(maxGuests)}; 
      }
      // if(price){
      //   filters.price={$lte:Number(price)}; 
      // }
      console.log(filters)
      console.log('try to get filter data')
      const data=await PredefinedRent.find(filters)
      res.status(200).json(data)
   } catch (error) {
       console.log('error in getting data from collection',error)
   }

}

export const getOnePreDefinedRent=async(req,res)=>{
   console.log(req.url)
   try {
     const data= await PredefinedRent.findById(req.params.id)
     res.status(200).json(data)
      
   } catch (error) {
      console.log('error in getting data from collection',error)
   }

}