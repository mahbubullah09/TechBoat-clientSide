import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/usePublic";

const CouponRow = ({ products, handleDelete }) => {
 
  
  const {
    _id,
    code,
    date,
    discription,
    discount
   
  } = products;

  const product_id = _id;
  const id = _id;

 



  const handleUpdate = (id) =>{
    console.log(id);

    const productInfo = {
      name,
      image,
      external_link,
      description,
      tags,
      OwnerName,
      email,
      OwnerImage,
      status: NStatus ,
      time
    };
    console.log(productInfo);
   

    fetch(`http://localhost:5000/products/${id}`, {
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
          }
        });


  }

  return (
    <tr>
      <td>
        <div className="  space-x-3">{products?.code}</div>
      </td>
      
      <th>
   
          <div className="flex flex-col gap-2">
          <Link to={`product/${products?._id}`}>
            <button className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white">
              Details
            </button>
          </Link>
            
             
           

           
          </div>
        
      </th>

      <th>
        <div className="flex flex-col gap-2">
        <button
              onClick={() => handleDelete(products?._id)}
              className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white"
            >
              Delete
            </button>
        
            <Link to={`updatecoupon/${products?._id}`}>
          <button  className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white">
               Update
              </button>
              </Link>
         
        </div>
      </th>
    </tr>
  );
};

export default CouponRow;
