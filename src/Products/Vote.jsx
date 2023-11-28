import React, { useContext, useEffect, useState } from 'react';
import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/usePublic';

const Vote = ({data}) => {
  const {user} = useContext(AuthContext)
  const user_mail= user?.email

  const [blocked, setBlocked] = useState(true) 
   
    const id = data?._id;

const ownerMail = data?.email


useEffect(() =>{
  if(user_mail === ownerMail){
    setBlocked(false)
  }
},[user_mail,ownerMail])
    
    const axiosPublic = useAxiosPublic();

    const [UV, setUV] = useState([]);
  
 

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



  const [Voted, setVoted] = useState([]);


  useEffect(() => {
    axiosPublic.get(`/upvotes/email?email=${user_mail}`)
    .then((res) => {
      setVoted(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => setVoted(data));
  }, [axiosPublic,user_mail]);
 

  //filter

  const [IsVoted, setIsVoted] = useState();

  useEffect(() => {
    const findVoted = Voted?.find((data) => data?.product_id === id);
    setIsVoted(findVoted);
  }, [id, Voted]);



  //downvote

  const [DV, setDV] = useState([]);
 


useEffect(() => {
  // //    axios.get(url, {withCredentials:true})
  // //    .then(res => {
  // //     setBookings(res.data)
  // //    })

  // fetch(`http://localhost:5000/`)
  //   .then((res) => res.json())
  //   .then((data) => setDV(data));

    axiosPublic.get(`/downvotes/products?product_id=${id}`)
    .then((res) => {
      setDV(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, [id,axiosPublic]);



const [DownVoted, setDownVoted] = useState([]);


useEffect(() => {
  axiosPublic.get(`/downvotes/email?email=${user_mail}`)
  .then((res) => {
    setDownVoted(res.data);
  })
  .catch((error) => {
    console.error(error);
  });
  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => setDownVoted(data));
}, [axiosPublic,user_mail]);


//filter

const [IsDownVoted, setIsDownVoted] = useState();

useEffect(() => {
  const findDownVoted = DownVoted?.find((data) => data?.product_id === id);
  setIsDownVoted(findDownVoted);
}, [id, DownVoted]);


   

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
                   
                     
                    {user && blocked  ? (
                      <div>
                        {!IsVoted?
                          <button onClick={handleUp} className="text-xl">
                          <BiUpvote />
                        </button>
                        :
                        <p className="text-xl">
                        <BiSolidUpvote />
                      </p>
                        }
                      </div>
                    ) : (
                      <p className="text-xl">
                        <BiUpvote />
                      </p>
                    )}
                    
                    <h2> {UV?.length}</h2>
                  </div>

                  <div className="flex items-center gap-1">
                   <div>
                   {user && blocked ? (
                     <div>
                      {!IsDownVoted?
                         <button onClick={handleDown} className="text-xl">
                         <BiDownvote />{" "}
                       </button>
                       :
                       <p className="text-xl">
                        <BiSolidDownvote />
                      </p>
                      }
                     </div>
                    ) : (
                      <p className="text-xl">
                        <BiDownvote />{" "}
                      </p>
                    )}
                   </div>

                    <h2> {DV?.length}</h2>
                  </div>
                </div>
            
        </div>
    );
};

export default Vote;