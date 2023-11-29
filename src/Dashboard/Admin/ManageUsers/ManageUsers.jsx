import { useContext, useEffect, useState } from "react";


import Swal from "sweetalert2";
// import axios from "axios";

// import { Helmet } from "react-helmet-async";


import UsersRow from "./UsersRow";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../hooks/usePublic";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  console.log(users);
  const axiosPublic = useAxiosPublic();





  const url = `http://localhost:5000/users`;

  useEffect(() => {
    // axios.get(url, { withCredentials: true })
    // .then((res) => {
    //   setUsers(res.data);
    // });

    // axiosPublic.get(`http://localhost:5000/users`)
    // .then((res) => {
    //     setUsers(res.data);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [axiosPublic, url]);
  console.log(users);

  const handleDelete = (id,RID) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
          //Deleteusers
          fetch(`http://localhost:5000/users/${RID}`, {
            method: "DELETE",
          })
          
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
  
              if (data.deletedCount > 0) {
                
                const remaining = users.filter(
                  (users) => users._id !== id
                );
  
                setUsers(remaining);
              }
            });

            //delete products

            fetch(`http://localhost:5000/products/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
    
                if (data.deletedCount > 0) {
                  Swal.fire("Deleted!", "This product has been deleted.", "success");
                //   const remaining = users.filter(
                //     (users) => users._id !== id
                //   );
    
                //   setUsers(remaining);
                }
              });

            
          }
    });
  };
  const handleKeep = (id) => {
    
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Keep it!",
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('keep');
            fetch(`http://localhost:5000/users/${id}`, {
              method: "DELETE",
            })
            
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
    
                if (data.deletedCount > 0) {
                  Swal.fire("Keeped!", "This product has been Keeped.", "success");
                  const remaining = users.filter(
                    (users) => users._id !== id
                  );
    
                  setUsers(remaining);
                }
              });
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
                handleDelete={handleDelete}
                handleKeep={handleKeep}
               
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
