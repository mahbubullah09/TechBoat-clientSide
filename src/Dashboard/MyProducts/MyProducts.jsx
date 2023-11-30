import { useContext, useEffect, useState } from "react";


import Swal from "sweetalert2";
// import axios from "axios";

// import { Helmet } from "react-helmet-async";
import ProductRow from "./ProductRow";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/usePublic";
import { useQuery } from "@tanstack/react-query";

const MyProducts = () => {
  const { user } = useContext(AuthContext);


  const User_Mail =user?.email




  const axiosPublic = useAxiosPublic();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["product", User_Mail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/product/${User_Mail}`, { withCredentials: true });
      return res.data;
    },
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
        fetch(`https://tech-boat-server.vercel.app/products/${id}`, {
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

  const handleUpdate = (id) => {
    console.log(id);
    fetch(`https://tech-boat-server.vercel.app/products/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
         
          refetch()
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

              <th>Vote</th>
              <th>Status</th>
              <th>Update/Cancel</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}

            {products.map((products) => (
              <ProductRow
                key={products._id}
                products={products}
                handleDelete={handleDelete}
                handleStatus={handleUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
