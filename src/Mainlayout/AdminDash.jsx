import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import AdminSlider from "../Dashboard/Admin/AdminDashboard";

const AdminDash = () => {
  return (
    <div className='grid grid-cols-10'>
      <div className="col-span-3">
        <AdminSlider />

        <Toaster />
      </div>
      <div className="col-span-7">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDash;
