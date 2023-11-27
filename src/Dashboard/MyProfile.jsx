import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider"
import { FaCircleDollarToSlot } from "react-icons/fa6";

import { FaBangladeshiTakaSign } from "react-icons/fa6";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="flex gap-4 items-center my-20">
        <div>
        <img className="text-center w-32 mx-auto rounded-2xl" src={user?.photoURL} alt="" />
        </div>
        <div>
        <h2>{user?.displayName}</h2>
        <h5>{user?.email}</h5>
        <button className="bg-[#0D6EFD] text-white text-sm font-semibold px-4 py-2 rounded">
          Subscribe Now <span className="flex justify-center gap-2 items-center"><FaBangladeshiTakaSign />2000</span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
