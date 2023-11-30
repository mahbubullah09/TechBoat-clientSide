import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import ReviewCardStracture from "./ReviewCardStracture";
import useAxiosPublic from "../hooks/usePublic";
import { useQuery } from "@tanstack/react-query";

const ReviewCard = ({ id, }) => {
 
  console.log(id);


  const axiosPublic = useAxiosPublic();

  const { data: reviewed = [], refetch } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/review/products?gadget_id=${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });



  return (
    <div className=" grid place-content-center">
      {reviewed.length > 0 ? (
        <div className=" max-w-xl">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            spaceBetween={30}
            effect={"coverflow"}
            grabCursor={false}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 50,
              depth: 100,
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
            {reviewed?.map((data, idx) => (
              <SwiperSlide key={idx}>
                <ReviewCardStracture data={data} />
              </SwiperSlide>
            ))}

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
      ) : (
        <div>
          <h2 className="text-4xl font-bold text-center text-gray-300 my-10">
            No Review Available
          </h2>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
