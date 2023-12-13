import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/usePublic";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import TopProductsCard from "./TopProductsCard";
import ProductCard from "./ProductCard";

const TopProducts = () => {
  const axiosPublic = useAxiosPublic();

  const [topp, setTopp] = useState([]);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products`);
      return res.data;
    },
  });

  useEffect(() => {
    const Top = products?.filter((data) => data.vote_count > 14);
    setTopp(Top);
  }, [products]);

  console.log(topp);
  return (
    <div>
      <div className="hidden md:block">
        <h2 className="text-4xl font-bold text-center my-5">Top <span className=" text-[#0f829f]">Products</span></h2>
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={2}
          spaceBetween={30}
          effect={"coverflow"}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{
            rotate: 10,
            stretch: 5,
            depth: 200,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          <div className="mb-28">
            {topp.map((data, idx) => (
              <SwiperSlide key={idx}>
                <ProductCard key={idx} data={data} />
              </SwiperSlide>
            ))}
          </div>

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
      <div className=" md:hidden">
        <h2 className="text-4xl font-bold text-center my-5">Top <span className=" text-[#0f829f]">Products</span></h2>
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={30}
          effect={"coverflow"}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{
            rotate: 10,
            stretch: 5,
            depth: 200,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          <div className="mb-28">
            {topp.map((data, idx) => (
              <SwiperSlide key={idx}>
                <ProductCard key={idx} data={data} />
              </SwiperSlide>
            ))}
          </div>

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default TopProducts;
