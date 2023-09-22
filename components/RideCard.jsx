'use client';
import { useState } from "react";
import Image from "next/image";
import{useSession} from 'next-auth/react';
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify"

const ParticipantList =({participants})=>{

 return (
  <div>
    
 { participants.map((participant)=>
    <p
     className="text-gray-600"
    key = {participant.fullname}
    >
      {participant.fullname}
    </p>
  )
 }

  </div>
  )


}
const RideCard = ({ride, handleEdit, handleDelete ,joined}) => {

     const {data:session} = useSession();
     const pathName = usePathname();
     const router = useRouter();

// Create a Date object from the input string
const date = new Date(ride.time);

// Define the options for formatting the date string
const options = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'short'
};

// Convert the date to the desired formatted string
      const fullDetail= date.toLocaleString('en-US', options);
      const fullDetails = new Date(fullDetail)
      //console.log(fullDetails.getDay())
     
      const hours = fullDetails.getHours();
      const minutes = fullDetails.getMinutes();
    //console.log(ride)

      const year = fullDetails.getFullYear();
      const month = fullDetails.getMonth() + 1; 
      const day = fullDetails.getDate();


     const handleFull =(e)=>{
             e.preventDefault();
             toast("This Ride is already Full",{hideProgressBar:true, autoClose:2000,type:'error'})
     }

 
  return (
    <div className="ride_card">
     

        <div className="flex-1 flex justify-start items-center gap-3 pb-4"
        >
          <Image
          src={ride.creator.image}
          alt= "user image"
          width={35}
          height={35}
          className="rounded-full object-constain "
          />
        <div className="flex flex-col w-full">
            <h3 className="font-satoshi text-gray-500">
              {ride.creator.name}
            </h3>
            <hr className="h-1 w-full mt-3"/>
          </div>
          
        </div>
        
     
       <h5
      className="font-satoshi flex-between font-semibold text-gray-900">
      {ride.from.toUpperCase()} <Image src={"/assets/icons/arrow.gif"} alt="arrow image" height={25} width={25} /> {ride.to.toUpperCase()}
    </h5>
    <p className="my-4 flex-between font-satoshi text-sm text-gray-700">
      <span>{`${day}-${month}-${year}`}</span>
       <span>{`${hours}:${minutes}`}</span>
     
    </p>
    <p className="text-gray-500 my-2">
      {ride.capacity-ride.countppl} Seats left
    </p>
    <p className="text-gray-500 my-2">
    ₹ {ride.price}/- Per head
    </p>

    

    {
  
    joined === false && ride.participants.length > 0 ? <div>
      <p className="text-gray-700 font-semibold">Joined Users</p>
      <hr className="h-1 w-full mt-4 mb-4"/>
      <ParticipantList
      participants = {ride.participants}
     />
     <br />
     
     </div>:null

    }
  
  <div className="flex-end">
  
    
  {
       joined === false ? (
      <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
      <p
      className="font-inter text-sm  cursor-pointer"
      onClick={handleEdit}
      >
       Edit
      </p>
      <p
      className="font-inter text-sm  cursor-pointer"
      onClick={handleDelete}
      >
      Delete
      </p>
      </div>
     ):
  
  
    (joined === true?
    null:
    <Link href={`/join/${ride._id}`}>
     <button
      onClick={ride.countppl === ride.capacity ? handleFull:null}
      className={ride.countppl  === ride.capacity?'':"black_btn"}
    >
      
     {ride.countppl  === ride.capacity ? "Full" : "Join"}
    </button>
    </Link>
   
    
    
    )}

  
  </div>
   
    </div>
  )
}

export default RideCard





// <p className="my-4 font-satoshi text-sm text-gray-700" style={{wordWrap:"break-word"}}>
// {post.prompt}
// </p>
// <p className="font-inter text-sm blue_gradient cursor-pointer"
// onClick={() => handleTagClick && handleTagClick(post.tag)}
// >
// #{post.tag}
// </p>

