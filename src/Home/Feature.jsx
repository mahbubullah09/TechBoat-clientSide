import  { useEffect, useState } from 'react';


import { Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/usePublic';
import ProductCard from '../Products/ProductCard';
import CheckData from './CheckData';

const Feature = () => {
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      //         fetch('https://tech-boat-server.vercel.app/products')
      //         .then(response => response.json())
  
      //  .then(data => setData(data))
  
      axiosPublic
        .get("/features")
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [axiosPublic]);


    data.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
    
        // Compare dates first
        if (timeA.toDateString() !== timeB.toDateString()) {
          return timeB - timeA;
        }
    
        // If the dates are the same, compare times
        return timeB.getTime() - timeA.getTime();
      });
    
   



    
    return (
        <div>

            <div>
                <h2 className='my-6 text-black text-4xl text-center font-bold'>Feature <span className=' text-[#0f829f]'>Products</span></h2>
            </div>
             <div className='grid grid-cols-3 gap-8  my-4'>
                
                {
                    data.slice(0,6).map((data, i) => <CheckData key={i} data={data}/>)
                }

            </div>
            <div className='grid place-content-center'>
        
            </div>

            
            
        </div>
    );
};

export default Feature;