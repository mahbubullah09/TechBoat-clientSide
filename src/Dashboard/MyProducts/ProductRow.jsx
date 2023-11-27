import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/usePublic";

const ProductRow = ({ products, handleDelete, handleUpdate }) => {
  console.log(products);

  const id = products?.id;

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

      axiosPublic.get(`/upvotes/products?product_id=${id}`)
      .then((res) => {
        setUV(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id,axiosPublic]);


  
//   const time = moment(date, "YYYYMMDD").fromNow();
//   console.log(time);

  //compare booking date

  

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
              Cancel
            </button>
         
            
        
        </th>
      
    </tr>
  );
};

export default ProductRow;
