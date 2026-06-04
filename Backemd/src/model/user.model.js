const mongoose  = require('mongoose')


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Username is Required'],
        unique : [true, 'Username Already Exist Try New One']
    },
    email : {
        type : String,
        required : [true, 'email is required'],
        unique : [true, 'email is already exist try with new one']
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
        select : false
    }
})

const userModel = mongoose.model('users', userSchema)

// task
// userSchema.pre("save", function(next) { })
// userSchema.post("save", function(next) { })

module.exports = userModel