import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './hooks/usePublic';
import CouponCard from './CouponCard';

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

const CouponSection = () => {
    const axiosPublic = useAxiosPublic();

    const {data :  coupons = []} = useQuery({
        queryKey: ["coupons"],
        queryFn: async () =>{
          const res = await axiosPublic.get(`http://localhost:5000/coupons`);
          return res.data
        }
      })

      console.log(coupons);
    

    return (
        <div>


<div className=" max-w-6xl">
                    <Swiper
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      slidesPerView={1}
                      spaceBetween={30}
                      effect={"coverflow"}
                      grabCursor={true}
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
                      modules={[
                        Autoplay,
                        EffectCoverflow,
                        Pagination,
                        Navigation,
                      ]}
                      className="swiper_container"
                    >
                      {coupons?.map((data, idx) => (
                        <SwiperSlide key={idx}>
                         <CouponCard data={data}/>
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
           

           
            
        </div>
    );
};

export default CouponSection;