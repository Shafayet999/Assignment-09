import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const AuthLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            
                <Navbar></Navbar>
           
            <main className='w-11/12 mx-auto py-5 flex-1'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;