import React, { useContext, useEffect, useState } from 'react';
import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/usePublic';
import { useQuery } from '@tanstack/react-query';
import Products from './Products';

const Vote = ({data}) => {

  const [RF,setRF]= useState(null)
  const [DRF,setDRF]= useState(null)
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

  

  const {data :  upvotes = [], refetch} = useQuery({
    queryKey: ["upvotes", id],
    queryFn: async () =>{
      const res = await axiosPublic.get(`/upvotes/products?product_id=${id}`);
      return res.data
    }
  })




  const {data :   Voted = [], } = useQuery({
    queryKey: ["upvotes", user_mail, RF ],
    queryFn: async () =>{
      const res = await axiosPublic.get(`/upvotes/email?email=${user_mail}`);
      return res.data
    }
  })
  console.log("Voted data",Voted);

 

  //filter

  const [IsVoted, setIsVoted] = useState();

  useEffect(() => {
    
    const findVoted = Voted?.find((data) => data?.product_id === id);
   
    setIsVoted(findVoted);
  }, [id, Voted]);

  console.log(IsVoted);



  //downvote



const {data :  downvotes = [], refetch: DownRf} = useQuery({
  queryKey: ["downvotes", id],
  queryFn: async () =>{
    const res = await axiosPublic.get(`/downvotes/products?product_id=${id}`);
    return res.data
  }
})



const {data :   DownVoted = [] } = useQuery({
  queryKey: ["downvotes", user_mail,DRF ],
  queryFn: async () =>{
    const res = await axiosPublic.get(`/downvotes/email?email=${user_mail}`);
    return res.data
  }
})



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
            refetch()
            setRF(new Date().getTime())
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
        DownRf()
        setDRF(new Date().getTime())
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
                    
                    <h2> {upvotes?.length}</h2>
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

                    <h2> {downvotes?.length}</h2>
                  </div>
                </div>
            
        </div>
    );
};

export default Vote;