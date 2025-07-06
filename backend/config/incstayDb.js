import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('db connected successfully')
    } catch (error) {
        console.log('db not connected',error)
        process.exit(1);
    } 
}

export default connectDb