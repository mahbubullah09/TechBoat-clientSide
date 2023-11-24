
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
           <Navbar/>
           <Outlet/>
           <Footer/>
        </div>
    );
};

export default MainLayout;