import React, { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard';

const Trending = () => {
    const [data,setData] = useState([])
    

    useEffect(() => {
        fetch('../../public/fakeData.json')
        .then(response => response.json())
   
 .then(data => setData(data))

    },[setData])


    data.sort((a, b) => {
        let x = parseInt(a.vote_count)
        let y = parseInt(b.vote_count)
    
    
    return y-x;
   
});
    
    return (
        <div>

            <div>
                <h2 className='my-6 text-black text-4xl text-center font-bold'>Trending <span className=' text-[#0f829f]'>Products</span></h2>
            </div>
             <div className='grid grid-cols-3 gap-8  my-4'>
                
                {
                    data.slice(0,6).map((data, i) => <ProductCard key={i} data={data}/>)
                }

            </div>

            
            
        </div>
    );
};

export default Trending;