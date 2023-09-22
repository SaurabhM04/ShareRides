import '@styles/global.css';
import Nav from '@components/Nav';

import Provider from '@components/Provider';
import Footer from '@components/Footer';

export const metadata = {
    title : "ShareBuddies",
    description: "Share Rides with others and split rent among all"
}

const RootLayout = ({children}) => {
  return (
   <html lang = "en">
    <body>
        <Provider>
        
        <main className='app'>
           <Nav />
            {children}
            <Footer />
        </main>
        
        </Provider>
    </body>
   </html>
  )
}

export default RootLayout