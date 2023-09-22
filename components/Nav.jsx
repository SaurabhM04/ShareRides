"use client"
import Link from "next/link";
import Image from "next/image";
import {useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';



const Nav = () => {

  const {data: session} = useSession();
  
  const [providers,setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(()=>{
   const setUpProviders = async () => {
    const response = await getProviders();
    setProviders(response);
   }

  setUpProviders();
 
  },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3 shadow-lg px-10 navbar ">
      <Link href="/" className="flex gap-2 flex-center"><Image 
      src="/assets/images/share-logo.svg"
      alt = "share_rides Logo"
      width={60}
      height={60}
      />
        <p className="logo_text">ShareRides</p>
        </Link>

        {/* {desktop navigation} */}
        <div className="sm:flex hidden">
         {
           session?.user? 
          <div className="flex gap-3 md: gap-5">
           <Link href={"/create-ride"} 
           className="black_btn"
           >
            Create Ride
           </Link>

           <button type="button" onClick={signOut} className="outline_btn">
            Sign Out
           </button>

           <Link href = "/profile">
           <Image src={session?.user.image}
           width={37}
           height={37}
           className="rounded-full"
           alt="profile_logo"
           />
           </Link>

          </div>:(<>
          {
            providers && Object.values(providers).map(provider =>
              (<button type = "button"
                key = {provider.name}
                onClick={()=>signIn(provider.id)}
                className="black_btn"
              >
                <span>
                <Image src={"/assets/icons/google.svg"}
                 width={20}
                 height={20}
                 className="rounded-full mr-2"
                 alt="profile_logo"
                />
                </span>
              Sign In
              </button>))
            
          }
          </>)
         }
        </div>

        {/* mobile navigation */}

        <div className="sm:hidden flex relative">
          {
            session?.user ?  
            <div className="flex">
            <Image src={session?.user.image}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile_logo"
            onClick={()=> settoggleDropdown((prev) => (!prev))}
            />
            {
              toggleDropdown && <div className="dropdown">
                <Link
                href={"/profile"}
                className="dropdown_link"
                onClick={()=>settoggleDropdown(false)}
                >
                My profile
                </Link>
                <Link
                href={"/create-ride"}
                className="dropdown_link"
                onClick={()=>settoggleDropdown(false)}
                >
                Create Ride
                </Link>
                <button
                type="button"
                onClick={()=>{
                  settoggleDropdown(false);
                  signOut();
                }}
                className="mt-5 w-full black_btn"
                >
                 Sign Out
                </button>

              </div>
            }
            </div>:<>
            {
              providers && Object.values(providers).map(provider =>
                (<button type = "button"
                  key = {provider.name}
                  onClick={()=>signIn(provider.id)}
                  className="black_btn"
                >
                  
                Sign In
                </button>))
              
            }
            </>
          }
        </div>

    </nav>
  )
}

export default Nav