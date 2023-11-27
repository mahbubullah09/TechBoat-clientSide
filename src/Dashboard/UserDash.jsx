import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const UserSlidebar = () => {
    const { user, logOut } = useContext(AuthContext);
    return (
        <div >

            
            <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />
      
      <div className=" bg-white text-blue-800 px-10 py-1 z-10 w-full">
          <div className="flex  items-center gap-4  py-2 text-5x1">

          <div>
              <img className="rounded-full w-12" src={user?.photoURL} alt="" />
            </div>
            <div className="font-bold text-blue-900 text-xl">
              Dash<span className="text-orange-600">Board</span>
            </div>
           
          </div>
        </div>
      

<div  className="w-48 mx-6 mt-2 " >
<div className=" rounded-xl shadow-lg mb-6 px-6 py-4 bg-orange-200  ">
              <p className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <span className="material-icons-outlined float-left pr-2">
                  face
                </span>
                My Profile
              </p>

              <Link to={'addproduct'}>
              
              
              <p className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <span className="material-icons-outlined float-left pr-2">
                  post_add
                </span>
                Add Products
              </p>
              </Link>
             <Link to={'myproduct'}>
             
             <p className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <span className="material-icons-outlined float-left pr-2">
                  view_cozy
                </span>
                My Products
              </p>
             </Link>
            </div>

            <div className="bg-orange-200 rounded-xl shadow-lg mb-6 px-6 py-4">
              <Link to={"/"}>
                <p className="inline-block text-gray-600 hover:text-black my-4 w-full">
                  <span className="material-icons-outlined float-left pr-2">
                    home
                  </span>
                  Home
                </p>
              </Link>

              <Link>
                <p
                  onClick={logOut}
                  className="inline-block text-gray-600 hover:text-black my-4 w-full"
                >
                  <span className="material-icons-outlined float-left pr-2">
                    power_settings_new
                  </span>
                  Log out
                </p>
              </Link>
            </div>
</div>
            
        </div>
    );
};

export default UserSlidebar;