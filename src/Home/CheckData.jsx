import { useState } from "react";
import { useEffect } from "react";
import useAxiosPublic from "../hooks/usePublic";
import ProductCard from "../Products/ProductCard";


const CheckData = ({data}) => {
    console.log(data);

    const [Ndata, setNData] = useState([]);
 const id = data?.product_id;
 const axiosPublic = useAxiosPublic();



useEffect(() => {
    //         fetch('https://tech-boat-server.vercel.app/products')
    //         .then(response => response.json())

    //  .then(data => setData(data))

    axiosPublic.get(`/products/${id}`)
      .then((res) => {
        setNData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosPublic,id]);


    return (
        <div>
               
                     <ProductCard  data={Ndata}/>
               

        </div>
    );
};

export default CheckData;