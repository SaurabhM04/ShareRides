"use client";


import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
      <ToastContainer />
    </SessionProvider>
  )
}

export default Provider