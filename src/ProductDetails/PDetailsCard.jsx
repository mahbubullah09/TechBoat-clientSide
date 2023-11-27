import { Link } from "react-router-dom";
import Tags from "../Products/Tag";
import Vote from "../Products/Vote";
import Review from "./Review";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const PDetailsCard = ({ data }) => {
  console.log(data);
  const { user } = useContext(AuthContext);
  const user_mail = user?.email;

  const id = data?._id;

  const handleReport = () => {
    let addReport = {
      product_id: id,
      user_mail,
    };
    console.log(addReport);

    fetch("http://localhost:5000/reports", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addReport),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data?.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Report has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-10 mx-auto max-w-4xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
              {data?.name}
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              {data?.description}
            </p>
            <div className="mt-4">
              <Vote data={data} />
            </div>

            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link to={data?.external_link}>
                  <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10">
                    External Link
                  </button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  onClick={handleReport}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  Report this
                </button>
              </div>
            </div>
          </div>

          <div className="relative lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
            <img
              className=" h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src={data?.image}
              alt=""
            />
            <div className="bg-black bg-opacity-60 py-2 px-2 absolute flex items-center gap-2  bottom-0">
              {data?.tags.map((data, i) => (
                <Tags key={i} tag={data} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="my-8">
        <hr />

        <Review data={data} />
      </div>
    </div>
  );
};

export default PDetailsCard;
