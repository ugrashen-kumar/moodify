const Redis = require('ioredis').default

// default lagane se redis ke suggestions vs code me aane lgta hai aur wiase koi kaam nhi hai default ka yehan pe wo jab require ka use krte hai lekin jab import ka use krte hai tb default lagana nhi padta hai

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})

redis.on("connect", ()=>{
    console.log("connect to Redis database")
})
redis.on('error', (err)=>{
    console.log(err)
})


module.exports = redis