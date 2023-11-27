import React, { useContext, useEffect, useState } from 'react';
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/usePublic';

const Vote = ({data}) => {
  const {user} = useContext(AuthContext)
  const user_mail= user?.email
   
    const id = data?._id;

    const axiosPublic = useAxiosPublic();
    console.log(id);
    const [UV, setUV] = useState([]);
    console.log(UV);
 

  useEffect(() => {
    // //    axios.get(url, {withCredentials:true})
    // //    .then(res => {
    // //     setBookings(res.data)
    // //    })

    // fetch(`http://localhost:5000/`)
    //   .then((res) => res.json())
    //   .then((data) => setUV(data));

      axiosPublic.get(`/upvotes/products?product_id=${id}`)
      .then((res) => {
        setUV(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id,axiosPublic]);
   

    const handleUp = () => {
        let addVote ={
          product_id: id,
        user_mail
        }
        console.log(addVote);

        fetch("http://localhost:5000/upvotes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addVote),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your Vote has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }

    const handleDown = () => {
      let addVote ={
        product_id: id,
      user_mail
      }
      console.log(addVote);

      fetch("http://localhost:5000/downvotes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addVote),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Vote has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }






    
    return (
        <div>
            <div className="mt-1 flex items-center gap-2 text-lg">
                  <div className="flex items-center gap-1">
                    {user ? (
                      <button onClick={handleUp} className="text-xl">
                        <BiUpvote />
                      </button>
                    ) : (
                      <p className="text-xl">
                        <BiUpvote />
                      </p>
                    )}

                    <h2> {UV?.length}</h2>
                  </div>

                  <div className="flex items-center gap-1">
                    {user ? (
                      <button onClick={handleDown} className="text-xl">
                        <BiDownvote />{" "}
                      </button>
                    ) : (
                      <p className="text-xl">
                        <BiDownvote />{" "}
                      </p>
                    )}

                    <h2> {data?.dvote_count}</h2>
                  </div>
                </div>
            
        </div>
    );
};

export default Vote;