import { Link } from "react-router-dom";

const AddCoupon = () => {
  return (
    <div>
      <hr className="my-4" />
      <div className="flex justify-between items-center mx-8">
        <h2 className="text-3xl font-bold">Add Coupon For Discount</h2>
        <Link to={`addcoupon`}>
          <button className="bg-[#0D6EFD] text-white text-sm font-semibold px-4 py-2 rounded">
            Add Coupon
          </button>
        </Link>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default AddCoupon;
