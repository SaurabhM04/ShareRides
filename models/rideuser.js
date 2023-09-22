import { Schema, model, models } from "mongoose";


const userRideSchema =new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  ride:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Ride"
  }
});


const UserRide = models.UserRide|| model("UserRide",userRideSchema);

export default UserRide;