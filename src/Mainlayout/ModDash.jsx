import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import ModSlide from "../Dashboard/ModaratorDash/ModSlide";

const ModDash = () => {
  return (
    <div className='grid grid-cols-10'>
      <div className="col-span-3">
        <ModSlide />

        <Toaster />
      </div>
      <div className="col-span-7">
        <Outlet />
      </div>
    </div>
  );
};

export default ModDash;
