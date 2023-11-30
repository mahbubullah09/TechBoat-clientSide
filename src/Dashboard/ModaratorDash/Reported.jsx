import { useContext, useEffect, useState } from "react";


import Swal from "sweetalert2";
// import axios from "axios";

// import { Helmet } from "react-helmet-async";

import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/usePublic";
import ReportedRow from "./ReportedRow";
import { useQuery } from "@tanstack/react-query";

const Reported = () => {
  const { user } = useContext(AuthContext);
 
  const axiosPublic = useAxiosPublic();



  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reports`);
      return res.data;
    },
  });
  console.log(reports);



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
          //Deletereports
          fetch(`http://localhost:5000/reports/${RID}`, {
            method: "DELETE",
          })
          
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
  
              if (data.deletedCount > 0) {
                
              
                refetch()
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
               
                refetch()
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
            fetch(`http://localhost:5000/reports/${id}`, {
              method: "DELETE",
            })
            
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
    
                if (data.deletedCount > 0) {
                  Swal.fire("Keeped!", "This product has been Keeped.", "success");
               
                  refetch()
                }
              });
          }
    });
  };

  
  return (
    <div>
    
      <div className="overflow-x-auto my-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>

              
              <th>Who Reports</th>
              <th>Keep/Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}

            {reports.map((reports) => (
              <ReportedRow
                key={reports._id}
                reports={reports}
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

export default Reported;
