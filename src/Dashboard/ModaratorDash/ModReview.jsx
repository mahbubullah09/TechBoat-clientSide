import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import ProductRow from "../MyProducts/ProductRow";
import ProductsRow from "./ProductsRow";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/usePublic";

const ModReview = () => {
  const { user } = useContext(AuthContext);


  const axiosPublic = useAxiosPublic();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`allproducts`);
      return res.data;
    },
  });

  const sortedData = [...products].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') {
      return -1;
    } else if (a.status !== 'pending' && b.status === 'pending') {
      return 1;
    } else {
      return 0;
    }
  });



  const handleDelete = (id) => {
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
        fetch(`https://tech-boat-server.vercel.app/allproducts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
           

              refetch()
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
              <th>Status</th>
              <th>Accept/Reject</th>
              <th>Details/Feature</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}

            {sortedData.map((products) => (
              <ProductsRow
                key={products._id}
                products={products}
                handleDelete={handleDelete}
                // handleUpdate ={handleUpdate}
                
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModReview;
