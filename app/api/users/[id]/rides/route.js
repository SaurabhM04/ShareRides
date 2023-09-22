import { connectToDB } from "@utils/database";
import Ride from "@models/ride";
import User from "@models/user";

export const GET  = async (request,{params}) =>{
    try {
        await connectToDB();

        
        const rides = await Ride.find({
            creator:params.id,
        }).populate('creator');
        
        const ridesjoined = await Ride.find({
            "participants.userId":params.id
        }).populate('participants.userId creator');


        return new Response(JSON.stringify({rides,ridesjoined}),{status:200});

    } catch (error) {
         return new Response("Failed to fetch all prompts",{status:500});
    }
}