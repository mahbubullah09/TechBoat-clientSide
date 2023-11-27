
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/usePublic";

const ReportedRow = ({ reports, handleDelete, handleKeep }) => {
  console.log(reports);

  const id = reports?.id;
  const name = reports?.name;
  console.log(name);


  const axiosPublic = useAxiosPublic();
  
 

  

  

  return (
    <tr>
      <td>
        <div className="  space-x-3">
          
            {name}
          
        </div>
      </td>
      
      <th>{reports?.user_mail}</th>

     
        <th className="flex flex-col gap-2">
        
            <button onClick={() =>handleKeep(reports?._id)}
            
            className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white">
             Keep
            </button>
          

         
            <button
              onClick={() => handleDelete(reports?.product_id)}
              className="w-24 bg-[#FF3811] py-2 px-4 rounded text-white"
            >
              Delete
            </button>
         
            
        
        </th>
      
    </tr>
  );
};

export default ReportedRow;
