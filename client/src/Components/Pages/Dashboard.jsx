import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import DashNav from '../Navbar/DashNav';
import Footer from '../Footer/Footer';


const Dashboard = () => {
    const {user} = useContext(UserContext)
  return (
    <>
      <DashNav />
      <div className="min-h-screen bg-gray-50 py-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">Welcome back!</h1>
               {!!user && (<h4 className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
                    Hey {user.name} how are you? It looks like you're going to make something delicious! Good Luck!
                </h4>)}
            </div>
            </div>
            <Footer />
    </>
  )
}

export default Dashboard
