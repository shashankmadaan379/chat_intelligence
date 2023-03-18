const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const bodyparser=require('body-parser');
const colors=require('colors');
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes=require('./routes/authRoutes');
const openaiRoutes=require('./routes/openaiRoutes');
//rest object
const app=express();
dotenv.config();

connectDB();
//middlewares
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(express.json());
app.use(errorHandler);


//API ROUTES
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/openai',openaiRoutes)
const PORT=process.env.PORT;
//listen server
app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.DEV_MODE} on Port ${PORT}`.bgCyan.white)
})