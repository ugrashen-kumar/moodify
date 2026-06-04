const userModel = require('../model/user.model')
const redis = require('../config/cache')
const jwt = require('jsonwebtoken')


const authUser = async(req, res, next) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json(
            {
                message : "Token not provided"
            }
        )
    }

    // yehi pe hr request pr token blacklist hai ya nhi check hota hai

    // using mongodb
    // const isTokenBlacklisted = userModel.findOne({
    //     token
    // })
    // using redis
    const isTokenBlacklisted = await redis.get(token)

    if(isTokenBlacklisted){
        return res.status(201).json({
            message : "Token Blacklisted"
        })
    }

    let decoded;
    try{

        decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET
        )
        console.log(decoded)
    }
    catch(err){
        return res.status(401).json(
            {
                Message : "Invalid token"
            }
        )
    }
    req.user = decoded
    next()
}


module.exports = {authUser}