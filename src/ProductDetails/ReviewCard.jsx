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


const ReviewCard = ({id}) => {
  const axiosPublic = useAxiosPublic();
    console.log(id);
    const [reviewed, setReviewed] = useState([]);
  const reviewUrl = `http://localhost:5000/review/products?gadget_id=${id}`;

  useEffect(() => {
    // //    axios.get(url, {withCredentials:true})
    // //    .then(res => {
    // //     setBookings(res.data)
    // //    })

    // fetch(`http://localhost:5000/`)
    //   .then((res) => res.json())
    //   .then((data) => setReviewed(data));

      axiosPublic.get(`/review/products?gadget_id=${id}`)
      .then((res) => {
        setReviewed(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id,axiosPublic]);
  console.log(reviewed);
    return (
        <div className=" grid place-content-center">
             {reviewed.length > 0 ? (
                  <div className=" max-w-md">
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
                        rotate: 0,
                        stretch: 0,
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
                      {reviewed?.map((data, idx) => (
                        <SwiperSlide key={idx}>
                         <ReviewCardStracture data={data}/>
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