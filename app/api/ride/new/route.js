import { connectToDB } from "@utils/database";
import Ride from "@models/ride";


export const POST = async (req) => {
    const {user,to,from,weare,weneed,contact,price,time} = await req.json();

    try {
        await connectToDB();

        const newRide = new Ride({
            creator:user,
            to,
            from,
            contact,
            price,
            time,
            capacity:Number(weare) + Number(weneed),
            countppl:Number(weare)

        })

        await newRide.save();

        return new Response(JSON.stringify(newRide),{status:201});

    } catch (error) {
     
        return new Response("failed to create a new Ride",{status:500});
    }
}