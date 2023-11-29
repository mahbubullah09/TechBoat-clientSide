import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import img from "../../assets/images/login/login.svg"
import SocialLogIN from "./SocialLogIN";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/usePublic";




const SingUp = () => {
  const axiosPublic = useAxiosPublic();
  const { user, createUser, handleUpdateProfile } = useContext(AuthContext);

  const navigate = useNavigate();
  console.log(user);



  const handleSingUp = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
   
    console.log(name,image,email,password);



    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    if (password.length < 6) {
      toast.error("Password must be at least 6 charecter!");
      return;
    }
    else if (!hasCapitalLetter){
        toast.error("password should contain atleast one number capital letter");
        return
    }
    else if (!hasSpecialCharacter){
        toast.error("password should contain atleast one number special Charecter");
        return
    }
   
   

   // create user
    createUser(email, password)
      .then((res) => {
        handleUpdateProfile(name, image).then(() => {
          const userInfo = {
            name: res.user?.displayName,
            email: res.user?.email,
            role: 'user'
          };
          axiosPublic.post("/users", userInfo).then(() => {
           
            navigate("/");
          });   
         

          toast.success("Succesfully create account");
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <section className="my-8 max-w-5xl mx-auto">
        <div className="h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              {/* <img
                src={img}
                className="w-full" 
                alt="Sample image"
              /> */}
            </div>

            <div className="rounded  mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 border border-1 p-10">

                <h2 className=" font-bold text-4xl text-[#444444] text-center mb-8 ">Sing Up</h2>
              <form onSubmit={handleSingUp}>
               

              <p className="mb-3">Name</p>
              
              <div className="relative mb-6" data-te-input-wrapper-init>
                   
                   <input
                     type="text"
                     className="border block h-12 w-full rounded border-1 bg-transparent px-3 py-[0.32rem] "
                     name="name"
                     placeholder="Name"
                   />
                   
                 </div>
              <p className="mb-3">Image URL</p>
              
              <div className="relative mb-6" data-te-input-wrapper-init>
                   
                   <input
                     type="text"
                     className="border block h-12 w-full rounded border-1 bg-transparent px-3 py-[0.32rem] "
                     name="image"
                     placeholder="Image URL"
                   />
                   
                 </div>

                 <p className="mb-3">Email</p>

                <div className="relative mb-6" data-te-input-wrapper-init>
                   
                  <input
                    type="text"
                    className="border block h-12 w-full rounded border-1 bg-transparent px-3 py-[0.32rem] "
                    name="email"
                    placeholder="Email address"
                  />
                  
                </div>


                <p className="mb-3">Password</p>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="password"
                    className="border block h-12 w-full rounded border-1 bg-transparent px-3 py-[0.32rem] "
                    id="password"
                    placeholder="Password"
                  />
                 
                </div>

                <button type="submit" className="bg-[#FF3811] w-full rounded py-2 text-white font-bold">Sing Up</button>
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">

              <SocialLogIN/>
              </div>

              <p className="mb-0 mt-2 pt-1 text-sm font-semibold text-center">
                    Don't have an account?
                    <Link to={'/login'}
                   
                      className="text-danger text-[#FF3811]  font-bold transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                    >
                     LogIn
                    </Link>
                  </p>

                
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingUp;
