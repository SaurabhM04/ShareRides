import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { signIn } from "next-auth/react";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ],
      
      callbacks:{
        async session({session}) {

          const sessionUser = await User.findOne({
            email:session.user.email
          });
  
          session.user.id = sessionUser._id.toString();
  
          return session;
  
        },
        async signIn({profile}){

          try {
            await connectToDB();
        
            //if user already exist then authenticATE
            const userExist  = await User.findOne({email:profile.email});
            
            //else create new and authenticate
  
            if(!userExist)
            {
              await User.create({email:profile.email,
                     name:profile.name,
                     image:profile.picture,
              });
            }
            return true;
          } catch (error) {
            console.log("error checking if user exist :", error.message)
          }
  
        
        },
       
     
      }
      
})

export {handler as GET, handler as POST};




// The code you have provided is a NextAuth configuration that allows users to sign in with Google.
// The providers array specifies the providers that are available for sign in. In this case, the only provider is Google.

// The callbacks object specifies the callbacks that are called when a user signs in.
// The session callback is called when a user signs in successfully. The signIn callback
// is called when a user tries to sign in.

// The session callback takes a single argument, which is the session object. The session object contains 
//information about the user who signed in, such as their email address and ID.

// The signIn callback takes a single argument, which is the profile object. The profile object 
//contains information about the user who is trying to sign in, such as their name, email address, and picture.

// In this example, the session callback updates the session object with the user's ID. 
//The signIn callback checks to see if the user already exists in the database. If the user does not exist, 
//the signIn callback creates a new user in the database.

// I hope this helps! Let me know if you have any other questions.