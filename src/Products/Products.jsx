import React from 'react';

const Products = () => {
    return (
        <div>
            <h2>products</h2>
            <div className='max-w-6xl mx-auto flex justify-center items-center' >
                <input id="searchValue" className="bg-[#100f0f] bg-opacity-5 text-sm  py-2 px-3 w-72 md:w-96   my-5 rounded-md" type="text"
                    placeholder="  Search by Tag"/>
                <button  className="bg-[#0D6EFD] text-white text-sm font-semibold px-4 py-2 rounded">Search</button>
            </div>
        </div>
    );
};

export default Products;