'use client'
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import {  redirect, useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Image from 'next/image';
import RideCard from "@components/RideCard"
//import LoadingSpinner from "@components/LoadingSpinner"


const RideCardList = ({ data,joined,handleDelete,handleEdit }) => {
  return (
    <div className='mt-16 ride_layout'>
      {data.map((ride) => (
        <RideCard
          key={ride._id}
          ride={ride}
          joined = {joined}
          handleDelete={() => handleDelete&&handleDelete(ride)}
          handleEdit={() =>handleEdit&&handleEdit(ride)}
        />
      ))}
    </div>
  );
};


const page = () => {

    

    const { isAuthenticated } = useSession();

  
    const router = useRouter();
    const handleEdit = (ride) =>{
       router.push(`/update-ride?id=${ride._id}`);
    }
    const handleDelete = async (ride) => {
         const hasConfirmed = confirm("Are you sure you want to delete this ride?");
         if(hasConfirmed){
         try {
          const response = await fetch(`/api/ride/${ride._id.toString()}`,
           {
            method:'DELETE',
           }
           )


           if(response.ok)
           {
            router.push('/profile');
           }
           
         } catch (error) {
          console.log(error);
         }
        }
    }

    const {data:session} = useSession()

    const [joinedRides, setJoinedRides] = useState([]);
    const [createdRides, setCreatedRides] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRides= async () => {
          const response = await fetch(`/api/users/${session?.user.id}/rides`);
          const data = await response.json();
          setCreatedRides(data.rides);
          //console.log(data.ridesjoined)
          setJoinedRides(data.ridesjoined)
          setLoading(false);
        }
    
        
        if(!session){
          toast("Bhai Login karle Pahle", { hideProgressBar: true, autoClose: 2000, type: 'success' });
          router.push("/");
        }
        if(session?.user.id) fetchRides();
      },[])



      const [type, setType] = useState("joined");

      return (
        <section className="mt-5 minheight"  style={{width:"90vw"}}>
          <div className="flex md:w-3/5 w-full mx-auto bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg py-5 transition duration-300 hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
            <div className="w-1/5 mx-auto my-auto">
              <Image 
              className="mx-auto mb-3 rounded-full px-2 py-2"
              src={session?.user.image}
              width={110}
              height={110}
              alt="profile photo"
              />
            </div>
            <div className="flex flex-col w-4/5 ">
             <div className="w-full ">
              
              <p className="text-xl font-satoshi">
              <span>Name : </span>
                 {session?.user.name}
              </p>
              <p className="gray-500">
              <span>Email : </span>
              {session?.user.email}
               </p>
               
             </div>
             <hr className="h-1 w-1/2 rounded "/>
             <div >
               You Are Amazing
             </div>
            </div>
          </div>
    
          <div className="w-full mt-10">
            <div className="mx-auto text-slate-600 font-semibold flex justify-evenly md:w-1/4 w-3/4">
               <div>
               <button className="text-lg hover:text-black" onClick={() =>setType("joined")}>Joined</button>
               {type === "joined"?<hr className="h-1 bg-gray-700 border-0 rounded " />:null}
               </div>
               <div>
               <button  className=" text-lg hover:text-slate-900" onClick={() =>setType("created")}>Created</button>
               {type === "created"?<hr className="h-1 bg-gray-700 border-0 rounded "/>:null}
               </div>
            </div>
            <div>
            {type === "joined" ? (
                <RideCardList
                data={joinedRides}
                joined={true}
                />
                ) : (

               <RideCardList data={createdRides} 
                joined = {false}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
               )}
            </div>
          </div>
         
        </section>
      )
}

export default page