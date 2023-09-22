import Feed from "@components/Feed";

export default function Home() {
  return (
    <section className="w-full  flex-center flex-col minheight" >
    <h1 className="head_text text-center">
      Join | Create Rides to Share
      <br className="max-md:hidden"/>
    <span className="bluee_gradient text-center" >
     Save Money and Time
      </span>
      </h1>
      <p className="desc text-center">
       If you have booked a vehicle to go somewhere but some seats are empty , then you can ask other to join |
       You can let know others when you are going to city or Ranibazar via Auto so they can join you at given time 
       , it can save your time. 
      </p>

      <Feed />
     
   </section>
  )
}
