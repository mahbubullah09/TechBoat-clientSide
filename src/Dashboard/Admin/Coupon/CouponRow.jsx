import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/usePublic";

const CouponRow = ({ products, handleDelete }) => {
  const Stime = moment().format("YYYY-MM-DD h:mm:ss a");
  
  const {
    _id,
    code,
    date,
    discription,
    discount
   
  } = products;

  const product_id = _id;
  const id = _id;

 

  const [UV, setUV] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // //    axios.get(url, {withCredentials:true})
    // //    .then(res => {
    // //     setBookings(res.data)
    // //    })

    // fetch(`http://localhost:5000/`)
    //   .then((res) => res.json())
    //   .then((data) => setUV(data));

    axiosPublic
      .get(`/upvotes/products?product_id=${id}`)
      .then((res) => {
        setUV(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, axiosPublic]);

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
    time :Stime,
    }
    console.log(feature);


    fetch("http://localhost:5000/features", {
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
        

          <button onClick={() => handleUpdate(products?._id)} className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white">
               Update
              </button>
         
        </div>
      </th>
    </tr>
  );
};

export default CouponRow;
