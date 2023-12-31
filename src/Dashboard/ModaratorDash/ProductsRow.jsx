import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/usePublic";

const ProductsRow = ({ products, handleDelete }) => {
  
  
  const {
    _id,
    description,
    email,
    external_link,
    image,
    name,
    status,
    tags,
    time,
    OwnerName,
    OwnerImage,
   
  } = products;

  const product_id = _id;
  const id = _id;

 



  const handleFeature = () => {
    const feature = {
    product_id,
    description,
    email,
    external_link,
    image,
    name,
    status,
    tags,
    time ,
    }
    console.log(feature);


    fetch("https://tech-boat-server.vercel.app/features", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(feature),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Feature Product added successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
  };
  const NStatus = 'accepted'

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
   

    fetch(`https://tech-boat-server.vercel.app/products/${id}`, {
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
        <div className="  space-x-3">{products?.name}</div>
      </td>
      <th>{products?.status}</th>
      <th>
        {products?.status === "pending" ? (
          <div className="flex flex-col gap-2">
            
              <button onClick={() => handleUpdate(products?._id)} className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white">
                Accept
              </button>
           

            <button
              onClick={() => handleDelete(products?._id)}
              className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white"
            >
              Reject
            </button>
          </div>
        ) : (
          <p>added</p>
        )}
      </th>

      <th>
        <div className="flex flex-col gap-2">
          <Link to={`product/${products?._id}`}>
            <button className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white">
              Details
            </button>
          </Link>

          <button
            onClick={handleFeature}
            className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white"
          >
            Feature
          </button>
        </div>
      </th>
    </tr>
  );
};

export default ProductsRow;
