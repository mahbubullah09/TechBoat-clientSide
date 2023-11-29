import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/usePublic";

const UsersRow = ({ users,handleAdmin,handleRemove,handleModarator }) => {
  const { _id, name, email, role } = users;
  console.log(role, email, name, _id);
  const id = _id;

  const admin = "admin";
  const modarator = "modarator";
  const Aam = "user";



  const MakeAdmin = {
    name,
    email,
    role: admin,
  };
  const MakeModarator = {
    name,
    email,
    role: modarator,
  };
  const MakeUser = {
    name,
    email,
    role: Aam,
  };

 

  return (
    <tr>
      <td>
        <div className="  space-x-3">{users?.name}</div>
      </td>
      <th>{users?.email}</th>
      <th>{users?.role}</th>

      <th>
       { users?.email === 'admin@techboat.com' ?
       <h2 className="font-bold text-base">Main Admin</h2>

        :
        <div className="flex flex-col gap-2">
        <div>
          {role === "admin" ? (
            <button
            onClick={ () =>handleRemove(users?._id , MakeUser)}
              className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white"
            >
              Remove Admin
            </button>
          ) : (
            <button
              onClick={ () =>handleAdmin(users?._id, MakeAdmin)}
              className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white"
            >
              Make Admin
            </button>
          )}
        </div>
        <div>
          {role == "modarator" ? (
            <button
              onClick={ () =>handleRemove(users?._id , MakeUser)}
              className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white"
            >
              Remove Modarator
            </button>
          ) : (
            <button
             
              onClick={() =>handleModarator(users?._id , MakeModarator)}
              className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white"
            >
              Make Modarator
            </button>
          )}
        </div>
      </div>
       }
      </th>
    </tr>
  );
};

export default UsersRow;
