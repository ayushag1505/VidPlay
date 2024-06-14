import mongoose, {Schema} from "mongoose";

import bcrypt from 'bcrypt' ;
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username : {
        type : String ,
        unique : true ,
        trim : true ,
        required : true ,
        lowercase : true ,
        index : true 
    } ,
    
    email : {
        type : String ,
        unique : true ,
        trim : true ,
        required : true ,
        lowercase : true 
    } ,

    fullName : {
        type : String ,
        trim : true ,
        required : true ,
        index : true
    } ,

    avatar : {
        type : String ,
        required : true ,
    } ,

    coverImage : {
        type : String ,
    } ,

    watchHistory : [
        {
            type : Schema.Types.ObjectId ,
            ref : 'Video'
        }
    ] ,

    password : {
        type : String ,
        required : [true, 'Password is required']
    } ,

    refreshToken : {
        type : String
    }
}, { timestamps: true }) ;

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next() ; 

    this.password = bcrypt.hash(this.password, 3) ;
    next() ;
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id : this._id ,
        email : this.email ,
        username : this.username ,
        fullName : this.fullName 
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY 
    }
)
} 
userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id : this._id , 
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY 
    }
)
} 

export const User = mongoose.model('User', userSchema) ;