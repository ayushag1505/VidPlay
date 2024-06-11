import express from 'express'
const app = express() ;

import connectDB from './db/index.js';

import dotenv from 'dotenv' ;
dotenv.config() ;

connectDB() ;


// ( async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) ;

//         app.on("error", (error)=>{
//             console.log("ERR: ", error);
//             throw error ;
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log("Port Connected");
//         })
//     } catch (error) {
//         console.log(`Something went Wrong ${error}`);
//     }
// })()