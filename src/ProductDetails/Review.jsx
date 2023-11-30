import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import moment from 'moment';
import toast from 'react-hot-toast';
import ReviewCard from './ReviewCard';

const Review = ({data}) => {
    const id = data?._id
    

    const { user } = useContext(AuthContext);

    console.log(data?.name);
  
    const image = user?.photoURL;
    const user_name = user?.displayName;
  
    const time = moment().format("YYYY-MM-DD h:mm:ss a");
  
    const handleReview = (e) => {
      e.preventDefault();
      const rating = e.target.rating.value;
      e.target.rating.value = "";
      const message = e.target.message.value;
      e.target.message.value = "";
  
      const addReview = {
        image,
        user_name,
        time,
        rating,
        message,
        gadget_id: id,
      };
      console.log(addReview);
  
      fetch("https://tech-boat-server.vercel.app/reviews", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addReview),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          if (data?.insertedId) {
            toast.success("Review added successfully!!");
            setRF(new Date().getTime());
          }
        });
    };
    return (
        <div>
            <div className="flex  justify-between items-center max-w-6xl mx-auto ">
          <h1 className="text-center my-8 text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
            Review Section
          </h1>
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
            className=" flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
          >
            Post a Review
          </button>
        </div>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
              Feedback
            </h2>
            <p className="mb-5 leading-relaxed text-gray-600">
              If you had any issues or you liked this tech products, please share with
              us!
            </p>
            <form onSubmit={handleReview} method="dialog">
              <div className="mb-4 font-medium text-lg">
                <label
                  htmlFor="email"
                  className="text-sm leading-7 text-gray-600"
                >
                  Rating
                </label>
                <div className="flex items-center ">
                  <input
                    required
                    type="number"
                    min="1.0"
                    max="5.0"
                    name="rating"
                    step="0.1"
                    className="w-20 rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                  <p>out of 5</p>
                </div>
              </div>
              <div className="mb-4 font-medium text-lg">
                <label
                  htmlFor="message"
                  className="text-sm leading-7 text-gray-600"
                >
                  Message
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                ></textarea>
              </div>
              <button
                type="submit"
                className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
              >
                Send
              </button>
            </form>
            <p className="mt-3 text-xs text-gray-500">
              Feel free to connect with us on social media platforms.
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <hr />

     <div className='w-full'>
     <ReviewCard id={id}  />
     </div>
            
            
        </div>
    );
};

export default Review;