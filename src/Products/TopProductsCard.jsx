import { Link } from "react-router-dom";

const TopProductsCard = ({ data }) => {
  return (
    <div>
      <Link to={`/product/${data?._id}`}>
        <div>
          <img className="relative w-full" src={data?.image} alt="" />
          <p className="absolute top-0 left-1 md:text-4xl font-bold bg-[#57059e] text-white rounded-full py-2 px-2 bg-opacity-70 ">
            {data?.name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default TopProductsCard;
