const asyncHandler = (requestHandler)=> {
    (req, res, next) =>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=> next(err))
    }
}

export {asyncHandler}


// try-catch block way

//      breaking down the below function
// const asyncHandler = ()=> {}
// const asyncHandler = (fun)=> ()=> {}
// const asyncHandler = (fun)=> async()=> {}



// const asyncHandler = (fun) => async (req, res, next) =>{
//     try {
//         await fun(req, res, next) ;
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success : false ,
//             message : error.message  
//         })
//     }
// }