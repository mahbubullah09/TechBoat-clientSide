import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const UserDash = () => {

    const {user} = useContext(AuthContext)
    console.log(user);
  return (
    <div>
        <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet" />
      

      <div className="bg-orange-100 min-h-screen">
        <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
          <div className="flex items-center justify-between py-2 text-5x1">
            <div className="font-bold text-blue-900 text-xl">
              Dash<span className="text-orange-600">Board</span>
            </div>
            <div>
                <img className="rounded-full w-12" src={user?.photoURL} alt="" />


            </div>
           
          </div>
        </div>

        <div className="flex flex-row pt-24 px-10 pb-4">
          <div className="w-2/12 mr-6">
            <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
              <p className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <span className="material-icons-outlined float-left pr-2">
                  face
                </span>
                My Profile
                
              </p>

              <a className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <span className="material-icons-outlined float-left pr-2">
                  post_add
                </span>
                Add Products
                
              </a>
              <a className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <span className="material-icons-outlined float-left pr-2">
                  view_cozy
                </span>
                My Products
                
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
              <Link to={"/"}>
                <p className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <span className="material-icons-outlined float-left pr-2">
                  home
                </span>
                  Home
                  
                </p>
              </Link>
              
              <p className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <span className="material-icons-outlined float-left pr-2">
                  power_settings_new
                </span>
                Log out
                
              </p>
            </div>
          </div>

          <div className="w-10/12">
            <div className=" ">
              <div className=" w-full bg-no-repeat bg-red-200 border border-red-300 rounded-xl  mr-2 p-6">
                <p className="text-5xl text-center text-indigo-900">
                  Welcome  <span className="ml-2"> {user?.displayName}</span>
                 
                </p>
                
              </div>

              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDash;
