'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const CreatRide = () => {

   const {data:session} = useSession();
   const router = useRouter();
   const [submitting, setsubmitting] = useState(false);

    const [ride, setRide] = useState({    
    to:"",
    from:"",
    time:{},
    weare:{},
    weneed:{},
    price:"",
    contact:"",
    });

   const createRide = async (e) => {
        e.preventDefault();
        setsubmitting(true);
        try{
           const response = await fetch('/api/ride/new',
           {
            method:'POST',
            body:JSON.stringify({
                from:ride.from,
                user:session?.user.id,
                to:ride.to,
                time:ride.time,
                weare:ride.weare,
                weneed:ride.weneed,
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
  return (
    <Form 
    type="Create"
    ride = {ride}
    setRide = {setRide}
    submitting = {submitting}
    handleSubmit = {createRide}
    />
  )
}

export default CreatRide