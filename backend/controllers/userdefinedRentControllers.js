import UserdefinedRent from "../models/UserdefinedRent.js"

export const getAllUserDefinedRents=async (req,res)=>{
    try {
        console.log('trying to get data from userdefinedrents collection');
        const data=await UserdefinedRent.find({user: req.user.id })
        res.status(200).json(data)
        console.log('Fetching accommodations for user:', req.user.id);

    } catch (error) {
        res.status(500).json({message:error.message})
    }  
}

export  const createUserDefinedRent=async(req,res)=>{
    try {
        console.log(req.body)
        const rentData = {
        ...req.body,
        user: req.user.id
        };
        const data=new UserdefinedRent(rentData)
        await data.save();
        res.status(201).json(data)
        console.log('Saving accommodation for user:', req.user.id);
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

export const deleteUserDefinedRent=async(req,res)=>{
    try{
    console.log(req.params.id)
    const cc=await UserdefinedRent.findOneAndDelete(req.params.id)
    res.status(201).json({"deleted id":req.params.id})
    }catch(error){
        res.status(500).json({"message":error})
    }

}

export const getFilteredUserDefinedRents=async (req,res)=>{
   const {city,maxGuests}=req.query
   const filters ={};
   try {
      if(city && city !== 'null'){
        filters.city=city; 
      }
      if(maxGuests && maxGuests !== 'null'){
        filters.maxGuests={$gte:Number(maxGuests)}; 
      }

      console.log(filters)
      console.log('try to get filter data')
      const data=await UserdefinedRent.find(filters)
      res.status(200).json(data)
   } catch (error) {
       console.log('error in getting data from collection',error)
   }

}

export const getOneUserDefinedRent=async(req,res)=>{
   console.log(req.url)
   try {
     const data= await UserdefinedRent.findById(req.params.id)
     res.status(200).json(data)
      
   } catch (error) {
      console.log('error in getting data from collection',error)
   }

}