import { useContext, useEffect, useState } from "react";


import Swal from "sweetalert2";
// import axios from "axios";

// import { Helmet } from "react-helmet-async";
import ProductRow from "./ProductRow";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/usePublic";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setproducts] = useState([]);
  console.log(products);
  const axiosPublic = useAxiosPublic();

  const User_Mail =user?.email




  const url = `http://localhost:5000/product/${user?.email}`;

  useEffect(() => {
    // axios.get(url, { withCredentials: true })
    // .then((res) => {
    //   setproducts(res.data);
    // });

    // axiosPublic.get(`http://localhost:5000/product/${User_Mail}}`)
    // .then((res) => {
    //     setproducts(res.data);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    fetch(url)
      .then((res) => res.json())
      .then((data) => setproducts(data));
  }, [axiosPublic, User_Mail ,url]);

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
        fetch(`http://localhost:5000/products/${id}`, {
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

  const handleUpdate = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/products/${id}`, {
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
          const remaining = products.filter((products) => products._id !== id);

          const updated = products.find((products) => products._id !== id);
          updated.status = "confirm";
          const newproducts = [updated, ...remaining];
          setproducts(newproducts);
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
