import { Schema, model, models } from "mongoose";
const userSchema =new Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        unique:[true,'Email already exists'],
        required:[true,'Email is required']
    },
    image:{
        type:String,
    }

});


const User = models.User|| model("User",userSchema);

export default User;