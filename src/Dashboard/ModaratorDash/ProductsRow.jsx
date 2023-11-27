import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/usePublic";
import Swal from "sweetalert2";

const ProductsRow = ({ products, handleDelete, handleUpdate }) => {
  const time = moment().format("YYYY-MM-DD h:mm:ss a");
  
  const {
    _id,
    description,
    email,
    external_link,
    image,
    name,
    status,
    tags,
   
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
    time,
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

  return (
    <tr>
      <td>
        <div className="  space-x-3">{products?.name}</div>
      </td>
      <th>{products?.status}</th>
      <th>
        {products?.status === "pending" ? (
          <div className="flex flex-col gap-2">
            <Link to={`updateproduct/${products?._id}`}>
              <button className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white">
                Accept
              </button>
            </Link>

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
