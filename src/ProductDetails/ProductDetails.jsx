import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../hooks/usePublic';
import PDetailsCard from './PDetailsCard';

const ProductDetails = () => {
const {id} = useParams();
const axiosPublic = useAxiosPublic();
const [data, setData] = useState();
console.log(id);


useEffect(() => {
    //         fetch('http://localhost:5000/products')
    //         .then(response => response.json())

    //  .then(data => setData(data))

    axiosPublic.get(`/products/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosPublic,id]);
console.log(data);
    return (
        <div>
          <PDetailsCard data={data}/>
        </div>
    );
};

export default ProductDetails;