import Tags from "./Tag";
import Tag from "./Tag";
import TimeAgo from "timeago-react";
import { motion } from "framer-motion";

import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Vote from "./Vote";

const ProductCard = ({ data }) => {
  const { user } = useContext(AuthContext);
  return (
    
    <div>
      <motion.div
     whileHover={{ scale: 1.1 }}
     whileTap={{
       scale: 0.9,
       
       borderRadius: "100%"
     }}
  >
      
        <div className="antialiased text-gray-900 ">
          <div className="bg-gray-200   flex items-center justify-center">
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl ">
              {/* <!-- <div className="h-48 bg-cover bg-center" style="background-image:url('https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80')"></div>--> */}
              <img
                className="h-48 w-96 object-cover object-end"
                src={data?.image}
                alt="Home in Countryside"
              />
              <div className="p-2 ">
                <div className="flex gap-2 items-baseline">
                  {data?.tags?.map((data, i) => (
                    <Tags key={i} tag={data} />
                  ))}
                </div>
                <Link to={`/product/${data?._id}`}>
                <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                  {data?.name}
                </h4>

                </Link>
                <div className="flex items-center justify-between">
                <div>
                    <Vote data={data}/>
                </div>
                <div>
                
             
                </div>
                </div>

                
                <div className="mt-2 flex items-center">
                  <h2 className=" text-gray-600 text-sm">
                    <TimeAgo datetime={data?.time} />
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      
    </div>
  );
};

export default ProductCard;
