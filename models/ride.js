

import mongoose, {Schema,model,models} from 'mongoose';
import { stringify } from 'postcss';


const RideSchema = new Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
    ,
    to:{
        type:String,
        required:[true,"source and destination required"]
    },
    from:{
        type:String,
        required:[true,"source and destination required"]
    },
    contact:{
        type:String,
        required:[true,"contact of creator required"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    time:{
        type:Date,
        required:[true,"Time to leave is required"]
    },
    capacity:{
        type:Number,
        required:[true,"capacity of vehicle is required"]
    },
    price:{
        type:String,
    },
    status:{
        type:String,
        enum:["full","remaining"],
        default:"remaining"
    },
    vehicleType:{
        type:String,
        default:"Bailgaadi"
    },
    countppl:{
        type:Number,
        default:1,
    },
    participants: [{
        contact:{
            type: String,
            required: [true,"contact number of participant is required"]
        },
        fullname:{
            type:String,
            required:[true,"name is required of participant"]
        },
        enrollmentno:{
            type:String,
            required:[true,"enrollment number required"]
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
       
      }]

});

const Ride = models.Ride || model("Ride",RideSchema);

export default Ride;