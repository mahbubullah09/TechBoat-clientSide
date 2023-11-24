
const Banner = () => {
    return (
        <div>
            <div className="carousel w-full h-[80vh]">
  <div id="slide1" className="carousel-item relative w-full ">
    <img src='https://i.ibb.co/w0JsqxY/blog-glass-bulb-crack-purple.jpg' className="w-full rounded" />

    <div className="absolute h-full  items-center  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] flex transform -translate-y-1/2  top-1/2">
       <div className="space-y-7 w-full md:w-2/5 text-white mx-10 md:ml-20  ">
       <h2 className="text-2xl md:text-4xl lg:text-6xl ">
       Find the Hottest Gadgets First

        </h2>
        <p className="text-sm md:text-base">
        Discover the latest tech innovations and gadgets before anyone else. Our members share and discuss new product releases, early demos, prototypes and trends shaping the future of technology
        </p>

        <div className="flex gap-2 ">
            <button className="bg-[#FF3811] text-xs md:text-base  py-1 md:py-2 px-2 md:px-4 rounded text-white">
            Log in Now
            </button>

            <button className="border rounded border-white py-1 md:py-2 px-2 md:px-4 text-white"> Trending Products</button>
        </div>
       </div>
    </div>
    <div className="absolute flex justify-end gap-4 transform -translate-y-1/2 left-5 right-5 bottom-1">

    </div>
  </div> 
 
</div>
        </div>
    );
};

export default Banner;