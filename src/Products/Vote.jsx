import React, { useContext } from 'react';
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { AuthContext } from '../Provider/AuthProvider';

const Vote = ({data}) => {

    const {user} = useContext(AuthContext)
    return (
        <div>
            <div className="mt-1 flex items-center gap-2 text-lg">
                  <div className="flex items-center gap-1">
                    {user ? (
                      <button className="text-xl">
                        <BiUpvote />
                      </button>
                    ) : (
                      <p className="text-xl">
                        <BiUpvote />
                      </p>
                    )}

                    <h2> {data?.vote_count}</h2>
                  </div>

                  <div className="flex items-center gap-1">
                    {user ? (
                      <button className="text-xl">
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