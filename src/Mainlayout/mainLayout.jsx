
import { Toaster } from 'react-hot-toast';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
           <Navbar/>
           <Outlet/>
           <Footer/>
           <Toaster/>
        </div>
    );
};

export default MainLayout;