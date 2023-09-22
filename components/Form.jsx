import Link from 'next/link'
import React, { useEffect } from 'react'

const Form = ({ type,ride ,setRide,submitting ,handleSubmit}) => {
   
  useEffect(()=>{
    console.log(ride);
  },[])
  
  return (
    <section className='sm:w-full max-w-full sm:ml-20 ml-10 mr-10 my-5 flex-start flex-col'>
      <h1 className='head_text text-left'>{type} Ride</h1>

      <p className='desc text-left max-w-md'>{type} and let others join you</p>
      <form onSubmit={handleSubmit}
      className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism '
      >
        <div className='mt-4  flex flex-col sm:flex-row '>
        <label className='sm:pl-4' >
          <span className = "font-satoshi font-semibold text-base text-gray-700">From</span>
          <input type="text"
          value={ride.from}
          onChange={(e) => setRide({...ride,from:e.target.value})}
          placeholder='Starting point Or Source'
          required
          className='form_input' />
      </label>
      <label className='sm:pr-4' >
          <span className = "font-satoshi font-semibold text-base text-gray-700">To</span>
          <input type="text"
          value={ride.to}
          onChange={(e) => setRide({...ride,to:e.target.value})}
          placeholder='End point Or Destination'
          required
          className='form_input' />
      </label>
        </div>

        <div className='sm:pl-4 sm:pr-4'>
          <label >
          <span className = "font-satoshi font-semibold text-base text-gray-700">Time and Date of Ride</span>
            
            <input type="datetime-local"
             value={ride.time}
             onChange={(e) => setRide({...ride,time:e.target.value})}
            className='form_input'
            />
          </label>
        </div>
       {
       type === "Create"?
          <div className='sm:pl-4 sm:pr-4 flex flex-between'>
          <label className='w-full ml-4' >
          <span className = "font-satoshi font-semibold text-base text-gray-700">No. of buddies You are</span>
            
            <input type="Number"
            value={ride.weare}
            onChange={(e) => setRide({...ride,weare:e.target.value})}
            min={0}
            className='form_input'
            />
          </label>
      
          <label className='w-full ml-4' >
          <span className = "font-satoshi font-semibold text-base text-gray-700">No. of buddies You need</span>
            
            <input type="Number"
            value={ride.weneed}
            onChange={(e) => setRide({...ride,weneed:e.target.value})}
            min={0}
            className='form_input'
            />
          </label>
       
     </div>:
       
       <div className='pl-4 pr-4 flex flex-between'>
        <label className='w-full ml-2' >
        <span className = "font-satoshi font-semibold text-base text-gray-700">Capacity</span>

        <input type="Number"
        value={ride.capacity}
        onChange={(e) => setRide({...ride,capacity:e.target.value})}
        min={0}
        className='form_input'
        />
        </label>
        </div>}
        <div className='w-full'>
        <label className='w-full ml-4' >
          <span className = "font-satoshi font-semibold text-base text-gray-700">Contact Number </span>
            
        
           <span>+91</span>
               <input type="text" 
                 value={ride.contact}
                 onChange={(e) => setRide({...ride,contact:e.target.value})}
                 maxLength="10"
                 placeholder="012-345-6789" 
                 className='tele_input form_input'
               />
       
          </label>
        </div>
        <div className='w-full  pl-4 pr-4'>
        <label className='w-full' >
          <span className = "font-satoshi font-semibold text-base text-gray-700"> Amount per head </span>
               
               <input 
               value={ride.price}
               onChange={(e) => setRide({...ride,price:e.target.value})}
               type='text'
               placeholder='Enter Amount per head'
               className='form_input'
               />

          </label>
        </div>
        {/* <label >
          <span className = "font-satoshi font-semibold text-base text-gray-700">From</span>
          <input type="text"
          value={ride.from}
          onChange={(e) => setRide({...ride,from:e.target.value})}
          placeholder='Starting point Or Source'
          required
          className='form_input' />
      </label>

      <label >
          <span className = "font-satoshi font-semibold text-base text-gray-700">
            Tag {``}
          <span>(#developement #educational etc.)</span>
          </span>
        <input 
        value={post.tag}
        onChange={(e) => setpost({...post,tag:e.target.value})}
        placeholder='tag'
        required
        className='form_input'
        />
      </label>
      */}

      <div className = 'flex-end mx-3 mb-5 gap-4'>
        <Link href='/' className ="text-gray-500 text-sm">
          Cancel
        </Link>
        <button 
        type='submit'
        disabled = {submitting}
        className='px-5 py-1.5 text-sm  black_btn '

        >
          {submitting?`${type}...`:type}
        </button>
      </div> 
      </form>
    </section>
  )
}

export default Form