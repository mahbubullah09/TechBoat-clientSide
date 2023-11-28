import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import ProductRow from "../MyProducts/ProductRow";
import ProductsRow from "./ProductsRow";

const ModReview = () => {
  const { user } = useContext(AuthContext);
  const [products, setproducts] = useState([]);
  console.log(products);
  const url = `http://localhost:5000/allproducts`;

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
        fetch(`http://localhost:5000/allproducts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
              <th>Name</th>
              <th>Status</th>
              <th>Accept/Reject</th>
              <th>Details/Feature</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}

            {products.map((products) => (
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
