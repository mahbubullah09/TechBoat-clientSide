// import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";
import { Children, useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/usePublic";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  console.log(user?.photoURL);
  const axiosPublic = useAxiosPublic();
  const user_mail = user?.email;

  const { data: role } = useQuery({
    queryKey: ["/user", user_mail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/email?email=${user_mail}`);
      return res.data[0].role;
    },
  });
  console.log( role);
  // console.log(DashUser?.role);
  // useEffect(() =>{
  //   console.log(DashUser.role);
  // },[DashUser])

// const [dasUser, setDashUser] = useState()
//   const url = `http://localhost:5000/user/email?email=${user_mail}`;

//   useEffect(() => {
//     //     axios.get(url, { withCredentials: true }).then((res) => {
//     //       setproducts(res.data);
//     //     });

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setDashUser(data[0].role));
//   }, [url]);
//   console.log(dasUser);

  const navLink = (
    <div className=" gap-2 flex flex-col lg:flex-row ">
      <ul className="py-1 relative group">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? " text-white font-normal text-base bg-[#0f829f] rounded-full   py-1 px-3     "
              : " font-normal text-base  py-2 px-4  "
          }
        >
          {" "}
          Home
          <span className="absolute -bottom-0 left-1/2 w-0 h-0.5 bg-[#0f829f] group-hover:w-1/3 group-hover:transition-all"></span>
          <span className="absolute -bottom-0 right-1/2 w-0 h-0.5 bg-[#0f829f] group-hover:w-1/3 group-hover:transition-all"></span>
        </NavLink>
      </ul>

      <ul className="py-1 relative group">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? " text-white font-normal text-base bg-[#0f829f] rounded-full   py-2 px-4     "
              : " font-normal text-base  py-2 px-4  "
          }
        >
          {" "}
          Products
          <span className="absolute -bottom-0 left-1/2 w-0 h-0.5 bg-[#0f829f] group-hover:w-1/3 group-hover:transition-all"></span>
          <span className="absolute -bottom-0 right-1/2 w-0 h-0.5 bg-[#0f829f] group-hover:w-1/3 group-hover:transition-all"></span>
        </NavLink>
      </ul>
    </div>
  );

  return (
    <div className="bg-[#24252a] text-white">
      <div className="navbar Montserrat font-semibold  max-w-6xl mx-auto ">
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className=" menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
            >
              {navLink}
            </ul>
          </div>
          <Link className="text-2xl font-bold" to={"/"}>
            <span className="text-[#0f829f]">Tech</span>Boat
          </Link>
        </div>

        <div className="navbar-end">
          <ul className="menu menu-horizontal px-4 hidden lg:block">
            {navLink}
          </ul>

          {user?.email ? (
            <div className="cursor-pointer mr-2 flex items-center gap-2">
              <div className="dropdown dropdown-end ">
                <label tabIndex={0} className="">
                  <div className="w-10  ">
                    {user ? (
                      <img
                        className="  cursor-pointer rounded-full w-16"
                        src={user?.photoURL}
                        alt=""
                      />
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          <span className="text-xs">N</span>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="text-center mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60 text-black overflow-hidden "
                >
                  <div className="space-y-2">
                    <div>
                      <p>{user?.displayName}</p>
                    </div>
                    <div>
                      <p className="w-52">{user?.email}</p>
                    </div>
                    <div>
                      {
                        role === 'user' ?
                        <div className="text-center">
                        <Link to={"userdashboard"}>
                          <button className="   text-sm md:text-base font-semibold hover:bg-[#174f69]  bg-[#003f5c] w-full  text-white py-1 px-2 md:py-2 md:px-4 rounded-md hover:bg-blue-gray-800">
                            <p className="flex items-center justify-center gap-2">
                              <MdOutlineDashboardCustomize /> DashBoard{" "}
                            </p>
                          </button>
                        </Link>
                      </div>
                      :
                      ''
                      }
                      {
                        role == 'modarator'?
                        <div>
                        <Link to={"moddashboard"}>
                          <button className="  text-sm md:text-base font-semibold hover:bg-[#174f69]  bg-[#003f5c] w-full  text-white py-1 px-2 md:py-2 md:px-4 rounded-md hover:bg-blue-gray-800">
                            <p className="flex justify-center  items-center gap-2">
                              <MdOutlineDashboardCustomize /> DashBoard{" "}
                            </p>
                          </button>
                        </Link>
                      </div>
                      :
                      ''
                      }
                      {
                        role == 'admin'?
                        <div>
                        <Link to={"admindashboard"}>
                          <button className="  text-sm md:text-base font-semibold hover:bg-[#174f69]  bg-[#003f5c] w-full  text-white py-1 px-2 md:py-2 md:px-4 rounded-md hover:bg-blue-gray-800">
                            <p className="flex justify-center items-center gap-2">
                              <MdOutlineDashboardCustomize /> DashBoard{" "}
                            </p>
                          </button>
                        </Link>
                      </div>
                      :
                      ''
                      }
                    </div>

                    <div>
                      <div>
                        <button
                          className="  text-sm md:text-base font-semibold hover:bg-[#c4aa38] hover:text-black bg-[#ffcf00] w-full  text-black py-1 px-2 md:py-2 md:px-4 rounded-md hover:bg-blue-gray-800"
                          onClick={logOut}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          ) : (
            <div className=" text-sm md:text-base font-semibold hover:bg-[#e9c836] hover:text-black bg-[#ffcf00]  text-black py-1 px-2 md:py-2 md:px-4 rounded-md hover:bg-blue-gray-800 ">
              <Link to={"/login"}>Log In</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
