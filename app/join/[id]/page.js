//import Feed from "@components/Feed";

'use client'

import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
//import { useSearchParams } from "next/navigation"
//import Form from "@components/Form"
import Link from "next/link"
import { toast } from "react-toastify"

const JoinRide = ({params}) => {
const [ride, setride] = useState({
  contact:"",
  user:{}
})
  const [participant, setParticipant] = useState({
    contact:"",
    fullname:"",
    enrollmentno:"",

  });

  const {data:session} = useSession();

  const router = useRouter();
  //const searchParams = useSearchParams();
  const rideId = params.id;
   const [submitting, setsubmitting] = useState(false);


   const handleJoin = async (e) => {
      
    e.preventDefault();
    setsubmitting(true);
    
    if(session?.user.id === ride.user._id)
    {
      toast("Khud ki kese le skta hai??",{hideProgressBar:true, autoClose:2000,type:'error'});
      router.push('/');
    }
    if(!rideId ) return alert('RIDE id not found')
    if(session?.user.id !== ride.user._id)
    try{
       const response = await fetch(`/api/ride/${rideId}`,
       {
        method:'PATCH',
        body:JSON.stringify({
          
          newParticipant:{
            contact:participant.contact,
            userId:session?.user.id,
            fullname:participant.fullname,
            enrollmentno:participant.enrollmentno,

        }})
       }
       )
       console.log(response);
       if(response.ok)
       {
         toast("joined successfully",{hideProgressBar:true, autoClose:2000,type:'success'})
          router.push('/');
       }
       if(response.status === 409)
       {
        toast("You have already joined with this Id",{hideProgressBar:true, autoClose:2000,type:'error'})
        router.push('/');
       }
    }catch(error){
     console.log(error)
    }finally{
        setsubmitting(false);
    }
    
     
   }

   useEffect(()=>{
      if(!session)
      {
        toast("Login first",{hideProgressBar:true, autoClose:2000,type:'error'})
        router.push('/');
      }
      const getRideDetails = async ()=>{
          const response = await fetch(`/api/ride/${rideId}`);

          const data = await response.json();
        // console.log(data);
          setride({
           contact:data.contact,
           user:data.creator
          })
      }
       
      if(rideId) getRideDetails();
   },[rideId])
  
  return (
    <section className='sm:w-full max-w-full sm:ml-20 ml-10 flex-start flex-col'>
    <h1 className='head_text text-left'>Join Ride</h1>

    <p className='desc text-left max-w-md'>Join Our Rides and Enjoy</p>

    <h5>Reach Out Creator +91 {ride.contact}</h5>
    <form onSubmit={handleJoin}
    className='mt-10 w-full max-w-2xl my-4 flex flex-col gap-7 glassmorphism'
    >
      
     <label className='pl-4' >
        <span className = "font-satoshi font-semibold text-base text-gray-700">Full Name</span>
        <input type="text"
        value={participant.fullname}
        onChange={(e) => setParticipant({...participant,fullname:e.target.value})}
        placeholder='Full Name'
        required
        className='form_input' />
    </label>
    
    <label className='pl-4' >
        <span className = "font-satoshi font-semibold text-base text-gray-700">Enrollment No.</span>
        <input type="text"
        value={participant.enrollmentno}
        onChange={(e) => setParticipant({...participant,enrollmentno:e.target.value})}
        placeholder='Enrollment No.'
        required
        className='form_input' />
    </label>
    <label className='w-full ml-4' >
        <span className = "font-satoshi font-semibold text-base text-gray-700">Contact Number </span>
          
      
         <span>+91</span>
             <input type="tel" 
               value={participant.contact}
               onChange={(e) => setParticipant({...participant,contact:e.target.value})}
               maxLength={10}
               placeholder="012-345-6789" 
               className='tele_input form_input'
             />
     
        </label>

    <div className = 'flex-end mx-3 mb-5 gap-4'>
      <Link href='/' className ="text-gray-500 text-sm">
        Cancel
      </Link>
      <button 
      type='submit'
      disabled = {submitting}
      className='px-5 py-1.5 text-sm  black_btn '

      >
        {submitting?"Joining...":"Join"}
      </button>
    </div> 
    </form>
  </section>
  )
}

export default JoinRide