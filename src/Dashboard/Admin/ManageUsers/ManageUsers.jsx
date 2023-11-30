import { useContext, useEffect, useState } from "react";


import Swal from "sweetalert2";
// import axios from "axios";

// import { Helmet } from "react-helmet-async";


import UsersRow from "./UsersRow";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../hooks/usePublic";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   console.log(users);
  const axiosPublic = useAxiosPublic();





//   const url = `https://tech-boat-server.vercel.app/users`;

//   useEffect(() => {
//     // axios.get(url, { withCredentials: true })
//     // .then((res) => {
//     //   setUsers(res.data);
//     // });

//     // axiosPublic.get(`https://tech-boat-server.vercel.app/users`)
//     // .then((res) => {
//     //     setUsers(res.data);
//     // })
//     // .catch((error) => {
//     //   console.error(error);
//     // });

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setUsers(data));
//   }, [axiosPublic, url]);
//   console.log(users);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users`);
      return res.data;
    },
  });




  const admin = "admin";
  const modarator = "modarator";
  const Aam = "user";



  

  const handleAdmin = (id,productInfo) => {
    console.log(id);

   

    fetch(`https://tech-boat-server.vercel.app/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Congaratulations",
            text: "Product Updated succesfully!",
          });
          refetch()
        }
      });
  };
  const handleModarator = (id,productInfo) => {
    console.log(id);

  

    fetch(`https://tech-boat-server.vercel.app/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Congaratulations",
            text: "Product Updated succesfully!",
          });
          refetch()
        }
      });
  };
  const handleRemove = (id,productInfo) => {
    console.log(id);

   
    fetch(`https://tech-boat-server.vercel.app/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Congaratulations",
            text: "Product Updated succesfully!",
          });
          refetch()
        }
      });
  };

  
 

  
  return (
    <div>
      {/* <Helmet>
        <title>RoomJet-My products</title>
      </Helmet> */}

      <div className="overflow-x-auto my-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>              
              <th>Role</th>
              <th>Admin/Modarator</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}

            {users.map((users) => (
              <UsersRow
                key={users._id}
                users={users}
                handleAdmin={handleAdmin}
                handleModarator={handleModarator}
                handleRemove={handleRemove}
               
               
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
