import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";


import { AuthContext } from "../../../Provider/AuthProvider";
import CouponRow from "./CouponRow";

const Coupons = () => {
  const { user } = useContext(AuthContext);
  const [products, setproducts] = useState([]);
  console.log(products);
  const url = `https://tech-boat-server.vercel.app/coupons`;

  useEffect(() => {
    //     axios.get(url, { withCredentials: true }).then((res) => {
    //       setproducts(res.data);
    //     });

    fetch(url)
      .then((res) => res.json())
      .then((data) => setproducts(data));
  }, [url]);

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
        fetch(`https://tech-boat-server.vercel.app/coupons/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Coupons has been deleted.", "success");
              const remaining = products.filter(
                (products) => products._id !== id
              );

              setproducts(remaining);
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
              <th>Coude</th>              
              <th>View</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}

            {products.map((products) => (
              <CouponRow
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

export default Coupons;
