
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div>
    <footer className="footer footer-center  bg-[#24252a] text-primary-content ">
        <div className="flex pt-20   ">
        <div className="text-4xl font-bold ">
        <span className="text-[#0f829f]">Tech</span>Boat
        </div>
            
        </div>
        <div className="pt-0 pb-0">
            <ul tabIndex="0" className="text-white gap-8  flex flex-wrap justify-center  md:grid-cols-6 gap-5     ">
                <li><Link to={'/'} >Home</Link></li>
           
                <li><Link to={'/products'} >Products</Link></li>

            </ul>
        </div>
        <div>
          <p>  Email: techboat@gmail.com</p>
          <p>Phone: 01909598003</p>
        </div>
        <div>
            <div className=" text-white  text-3xl flex flex-wrap justify-center gap-6 md:grid-cols-6   ">
              
                <FaTwitter></FaTwitter>
                <FaYoutube></FaYoutube>
                <FaFacebook></FaFacebook>
                <FaLinkedin></FaLinkedin>
                <FaInstagram></FaInstagram>

               
            </div>
        </div>
        <div className="pb-10">
            <p>All copyright reserved @techboat</p>
        </div>
    </footer>
            
        </div>
    );
};

export default Footer;