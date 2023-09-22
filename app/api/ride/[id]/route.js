import { connectToDB } from "@utils/database";
import Ride from "@models/ride";
//GET request
export const GET  = async (request,{params}) =>{
    try {
        await connectToDB();
        const ride = await Ride.findById(params.id).populate('creator');

        if(!ride)
        return new Response("Ride not found",{status:401});
       
         return new Response(JSON.stringify(ride),{
            status:200
         })
    } catch (error) {
         return new Response("Failed to fetch Ride",{status:500});
    }
}

export const PATCH = async (request,{params}) => {
    const {to,from,time,price,contact,capacity,newParticipant} = await request.json();
    try {
        await connectToDB();

        const existingRide = await Ride.findById(params.id);

        if(!existingRide) return new Response("Ride not found",{status:404});


        if(newParticipant)
        {
            const details = existingRide.participants;

            const check = details.find((participant)=> (participant.userId.equals(newParticipant.userId)));
           // console.log(check)
            if(check)
            {
                 //console.log("check me ghus gya");
                return new Response("You have already joined",{status:409});
            }
             if(!check) {   
            
            existingRide.participants.push(newParticipant);
            existingRide.countppl = existingRide.countppl+1;
            
             await existingRide.save();
            }
        }
        if(!newParticipant){
        existingRide.to = to;
        existingRide.from = from;
        existingRide.time = time;
        existingRide.price = price;
        existingRide.capacity = capacity;
        existingRide.contact = contact;
        await existingRide.save();

        }
         
        if(!check)
        return new Response("successfully updated the ride",{status:200})
    } catch (error) {
        return new Response("failed to update",{status:500})
    }
}

export const DELETE = async (request,{params}) => {
    
    try {
        await connectToDB();
        await Ride.findByIdAndRemove(params.id);
        return new Response("Ride deleted succesfully", {status:200});

    } catch (error) {
        return new Response("Failed to delete Ride",{
            status:500
        });
    }
}