
import Booking from '../models/Booking.js'


export const getBookings=async(req,res)=>{
    try {
        const data=await Booking.find({user:req.user.id}).populate('hotel')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

export const createBooking=async(req,res)=>{
    console.log(req.params.id);
    console.log(req.body);
    console.log(req.user.id)
    const obj={
        ...req.body,
        user: req.user.id ,
        hotel:req.params.id
    }
    console.log(obj)
    try {
        const book=new Booking(obj)
        await book.save()
        res.status(201).json(book)
    } catch (error) {
        res.status(500).json({message:error.message})
    }    
    
}

export const deleteBooking=async(req,res)=>{
    try{
    const culprit1=req.params.hotelId
    const culprit2=req.params.bookingId
    console.log(culprit1,culprit2)
    const alright=await Booking.findOneAndDelete({_id:culprit2,hotel:culprit1})
    res.status(201).json({"deleted id":culprit1,"delted id":culprit2})
    }catch(error){
        res.status(500).json({"message":error})
    }

}
