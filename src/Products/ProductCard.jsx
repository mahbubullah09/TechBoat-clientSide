import Tags from "./Tag";
import Tag from "./Tag";
import TimeAgo from 'timeago-react';

const ProductCard = ({ data }) => {
  
  return (
    <div>
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
              <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                {data?.name}
              </h4>

              <div className="mt-1">
                <span>$1,900.00</span>
                <span className="text-gray-600 text-sm">/ wk</span>
              </div>
              <div className="mt-2 flex items-center">
             
                <h2 className=" text-gray-600 text-sm"><TimeAgo datetime={data?.time} /></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
