import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/usePublic";



const SocialLogIn = () => {
    const axiosPublic = useAxiosPublic();
   const navigate = useNavigate()

    const {user, googleLogin} = useContext(AuthContext)
    console.log(user);

    const handleSocialSingin = () =>{
        googleLogin()
        .then(res =>  {
            const userInfo = {
                name: res.user?.displayName,
                email: res.user?.email,
              };
              axiosPublic.post("/users", userInfo).then(() => {
                toast.success('Succesfully logged in')
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