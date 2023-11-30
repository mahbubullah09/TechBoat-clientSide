// import { Helmet } from "react-helmet-async";
// import TagsInput from "./TagsInput/TagsInput";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import Tagtest from "../TAGTEST";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import moment from "moment";

const AddProduct = () => {
    const time = moment().format("YYYY-MM-DD h:mm:ss a");
    const [tags, setTags] = useState([]);
  const { user } = useContext(AuthContext);
  const OwnerName = user?.displayName;
  const OwnerEmail = user?.email;
  const OwnerImage = user?.photoURL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  console.log(tags);
  const status = 'pending'
  const onSubmit = async (data) => {
    const { name, photoURL, externalLink, description } = data;
    const productInfo = {
      name,
      image: photoURL,
      external_link: externalLink,
      description: description,
      tags,
      OwnerName,
      email: OwnerEmail,
      OwnerImage,
      status,
      time
    };
    console.log(productInfo);
    reset();

    fetch("https://tech-boat-server.vercel.app/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Products added successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });



  };
  return (
    <div>
      {/* <Helmet>
        <title>Dashboard | AddProduct</title>
      </Helmet> */}
      <h3 className="text-4xl font-playfair font-bold text-center mt-8">
        Add  New Product
      </h3>

      <div>
        <div className="bg-white mx-10 px-5 py-4 rounded">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-6 my-6">
              
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Owner name <span className="text-red-600 text-lg">*</span></span>
                </label>
                <input
                  type="text"
                  defaultValue={OwnerName}
                  disabled
                  className="h-10 border p-2 w-full "
                />
              </div>
             
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Owner Email <span className="text-red-600 text-lg">*</span></span>
                </label>
                <input
                  type="text"
                  defaultValue={OwnerEmail}
                  disabled
                  className="h-10 border p-2 w-full "
                />
              </div>
            </div>
           
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Owner Image <span className="text-red-600 text-lg">*</span></span>
              </label>
              <input
                type="text"
                defaultValue={OwnerImage}
                disabled
                className="h-10 border p-2 w-full "
              />
            </div>
            <div className="flex gap-6 my-6">
              
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Product name <span className="text-red-600 text-lg">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="Product name"
                  {...register("name", { required: true })}
                  className="h-10 border p-2 w-full "
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Product Image <span className="text-red-600 text-lg">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="Product PhotoURL"
                  {...register("photoURL", { required: true })}
                  className="h-10 border p-2  w-full "
                />
                {errors.photoURL && (
                  <span className="text-red-600">
                    Product PhotoURL is required
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-6 my-6">
              
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Tags <span className="text-red-600 text-lg">*</span></span>
                </label>
                <Tagtest tags={tags} setTags={setTags} />
              </div>
              
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">External Link <span className="text-red-600 text-lg">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="External Link"
                  {...register("externalLink", {
                    required: true,
                  })}
                  className="h-10 border p-2 w-full "
                />
                {errors.externalLink && (
                  <span className="text-red-600">
                    External Link is required
                  </span>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Description <span className="text-red-600 text-lg">*</span></span>
              </label>
              <textarea
                {...register("description", {
                  required: true,
                  minLength: 20,
                  maxLength: 500,
                })}
                className="textarea textarea-bordered h-24"
                placeholder="Product Description"
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.description?.type === "minLength" && (
                <p className="text-red-600">
                  Description must be 20 characters
                </p>
              )}
              {errors.description?.type === "maxLength" && (
                <p className="text-red-600">
                  Description must be less than 500 characters
                </p>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button className=" rounded-lg px-4 py-2 bg-[#0D6EFD] text-white text-lg">
                Submit 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
