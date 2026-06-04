const mongoose = require('mongoose')


// const ConnectToDatabase = async() =>{
//     const response = await mongoose.connect(process.env.MONGODB_URI)
//     console.log("Connected to Database")
// }

const ConnectToDatabase = () =>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Connected to Database")
    })
    .catch(err =>{
        console.log("Database connection error". err)
    })
}

module.exports = ConnectToDatabase