import express from 'express'
import connectDb from './config/incstayDb.js'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import bookingRoutes from './routes/booking.js'
import predefinedRentRoutes from './routes/predefinedRent.js'
import userRoutes from './routes/user.js'
import userdefinedRentRoutes from './routes/userdefinedRent.js' 
import cors from 'cors';   
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/upload.js'
import helmet from 'helmet'

let app=express()
dotenv.config()

//inbuild middleware
app.use(cors({origin:'http://localhost:5173',credentials:true}))
// app.use(cors({ origin: 'https://your-frontend.vercel.app', credentials: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(helmet())

//using cookie parser
app.get('/setcookies',(req,res)=>{
    res.cookie('muneeb',false)
    res.send('cookie is created')
})
app.get('/readcookies',(req,res)=>{
    const cookie=req.cookies; //we can access all cookies and pass all cookies in a obj name cookie
    res.json(cookie) //res on web
})

//routes
app.use(authRoutes)
app.use(bookingRoutes)
app.use(predefinedRentRoutes)
app.use(userRoutes)
app.use(userdefinedRentRoutes)
app.use(uploadRoutes)

app.get('/',(req,res)=>{
    res.send('hello')
    console.log('hello response send')
}
)

//db connectipn
console.log('Trying to connect Db');
connectDb().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`Port ${process.env.PORT}`);
})
})

