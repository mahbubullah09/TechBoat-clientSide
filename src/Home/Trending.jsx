import { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import useAxiosPublic from "../hooks/usePublic";
import { Link } from "react-router-dom";
import CouponSection from "../CouponSection";

const Trending = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState([]);

  useEffect(() => {
    //         fetch('https://tech-boat-server.vercel.app/products')
    //         .then(response => response.json())

    //  .then(data => setData(data))

    axiosPublic
      .get("/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosPublic]);

  data.sort((a, b) => {
    let x = parseInt(a.vote_count);
    let y = parseInt(b.vote_count);

    return y - x;
  });

  return (
    <div>
      <div>
        <h2 className="my-6 text-black text-4xl text-center font-bold">
          Trending <span className=" text-[#0f829f]">Products</span>
        </h2>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-3  gap-8  my-4">
        {data.slice(0, 6).map((data, i) => (
          <ProductCard key={i} data={data} />
        ))}
      </div>
      <div className="grid place-content-center">
        <Link to={`/products`}>
          <button className="bg-[#0D6EFD] text-white text-sm font-semibold px-4 py-2 rounded">
            See All
          </button>
        </Link>
      </div>

     <div className="my-8">
     <CouponSection/>
     </div>
    </div>
  );
};

export default Trending;
