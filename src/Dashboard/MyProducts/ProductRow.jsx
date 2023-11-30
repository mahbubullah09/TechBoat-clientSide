import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/usePublic";
import { useQuery } from "@tanstack/react-query";

const ProductRow = ({ products, handleDelete, handleUpdate }) => {
  console.log(products);

  const id = products?._id;
  const axiosPublic = useAxiosPublic();
  console.log(id);



  const { data: UV = [], refetch } = useQuery({
    queryKey: ["upvotes", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/upvotes/products?product_id=${id}`, { withCredentials: true });
      return res.data;
    },
  });


  


  

  return (
    <tr>
      <td>
        <div className="  space-x-3">
          
            {products?.name}
          
        </div>
      </td>
      <th>{UV?.length}</th>
      <th>{products?.status}</th>

     
        <th className="flex flex-col gap-2">
          <Link to={`updateproduct/${products?._id}`}>
            <button className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white">
              Update
            </button>
          </Link>

         
            <button
              onClick={() => handleDelete(products?._id)}
              className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white"
            >
              Delete
            </button>
         
            
        
        </th>
      
    </tr>
  );
};

export default ProductRow;
