'use client'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Form from "@components/Form"

const UpdateRide = ({params}) => {

    const searchParams = useSearchParams();

   const {data:session} = useSession();
   const router = useRouter();
   const [submitting, setsubmitting] = useState(false);
   const rideId = searchParams.get("id");

    const [ride, setRide] = useState({ });

   const updateRide = async (e) => {
        e.preventDefault();
        setsubmitting(true);
        try{
           const response = await fetch(`/api/ride/${rideId}`,
           {
            method:'PATCH',
            body:JSON.stringify({
                
                from:ride.from,
                user:session?.user.id,
                to:ride.to,
                time:ride.time,
                capacity:ride.capacity,
                contact:ride.contact,
                price:ride.price,


            })
           }
           )
           if(response.ok)
           {
              router.push('/');
           }
        }catch(error){
         console.log(error)
        }finally{
            setsubmitting(false);
        }
        
    }

    useEffect(()=>{
        const fetchRideDetails = async (rideId) =>{
              const response = await fetch(`/api/ride/${rideId}`);
               const data = await response.json();
              // console.log(data);
              setRide(data)
        }
         
        fetchRideDetails(rideId);
    },[])
  return (
    <Form 
    type="Update"
    ride = {ride}
    setRide = {setRide}
    submitting = {submitting}
    handleSubmit = {updateRide}
    />
  )
}

export default UpdateRide