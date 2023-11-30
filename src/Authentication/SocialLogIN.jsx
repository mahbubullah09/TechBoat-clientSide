import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/usePublic";
import axios from "axios";



const SocialLogIn = () => {
    const axiosPublic = useAxiosPublic();
   const navigate = useNavigate()

    const {user, googleLogin} = useContext(AuthContext)
    console.log(user);

    const handleSocialSingin = () =>{
        googleLogin()
        .then(result =>  {


            const user1 = result.user;
            console.log(user1);
    
            const loggeinUser = { email: user1?.email };
    
            axios.post("https://tech-boat-server.vercel.app/jwt", loggeinUser, {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                  navigate(location.state ? location.state : "/");
                  toast.success("Successfully login");
                }
              });



            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email,
                role: 'user'
              };
              axiosPublic.post("/users", userInfo).then(() => {
                // toast.success('Succesfully logged in')
                navigate(location?.state ? location.state : '/')
              });       

           
            })
            .catch((error) => {
        Swal("Oops!", error.message, "error");
      });
    }



 
    return (
        <div>
             <div className="divider px-4">continue with</div>
            <div className=" text-center my-6">
                <button onClick={handleSocialSingin} className=" text-5xl"> <FcGoogle></FcGoogle></button>
            </div>
        </div>
    );
};

export default SocialLogIn;