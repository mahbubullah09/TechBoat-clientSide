import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Products = () => {

    const [data,setData] = useState([])
    

    useEffect(() => {
        fetch('../../public/fakeData.json')
        .then(response => response.json())
   
 .then(data => setData(data))

    },[setData])
   
    const sortedData = data.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
    
        // Compare dates first
        if (timeA.toDateString() !== timeB.toDateString()) {
          return timeB - timeA;
        }
    
        // If the dates are the same, compare times
        return timeB.getTime() - timeA.getTime();
      });
    
      console.log(sortedData);
   



    
    return (
        <div className='max-w-6xl mx-auto'>
            
            <div className='max-w-6xl mx-auto flex justify-center items-center' >
                <input id="searchValue" className="bg-[#100f0f] bg-opacity-5 text-sm  py-2 px-3 w-72 md:w-96   my-5 rounded-md" type="text"
                    placeholder="  Search by Tag"/>
                <button  className="bg-[#0D6EFD] text-white text-sm font-semibold px-4 py-2 rounded">Search</button>
            </div>

            <div className='grid grid-cols-4 gap-2  my-4'>
                {
                    sortedData.map((data, i) => <ProductCard key={i} data={data}/>)
                }

            </div>




        </div>
    );
};

export default Products;