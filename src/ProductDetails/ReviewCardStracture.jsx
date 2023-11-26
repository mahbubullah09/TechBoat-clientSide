import moment from 'moment';
import React from 'react';

const ReviewCardStracture = ({data}) => {
    const time = moment(data?.time, "YYYYMMDD").fromNow();

    return (
        <div className=' my-8'>
              <div className="block rounded-lg bg-neutral-700 shadow-black/30">
                <div className="h-28 overflow-hidden rounded-t-lg bg-[#9d789b]"></div>
                <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2  border-neutral-800 bg-neutral-800">
                  <img src={data?.image} />
                </div>
                <div className="p-6">
                  <h4 className="mb-4 text-2xl text-center font-semibold">{data?.user_name}</h4>
                    <div className='flex justify-between items-center'>
                        <p>Ratings:{data?.rating}</p>
                        <p>{time}</p>

                    </div>
                  <hr />
                  <p className="mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="inline-block h-7 w-7 pr-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                    </svg>
                    {data?.message}
                  </p>
                </div>
              </div>
            </div>
    );
};

export default ReviewCardStracture;