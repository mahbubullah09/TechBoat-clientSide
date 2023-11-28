import { useContext, useEffect, useState } from "react";


import Swal from "sweetalert2";
// import axios from "axios";

// import { Helmet } from "react-helmet-async";

import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/usePublic";
import ReportedRow from "./ReportedRow";

const Reported = () => {
  const { user } = useContext(AuthContext);
  const [reports, setreports] = useState([]);
  console.log(reports);
  const axiosPublic = useAxiosPublic();





  const url = `http://localhost:5000/reports`;

  useEffect(() => {
    // axios.get(url, { withCredentials: true })
    // .then((res) => {
    //   setreports(res.data);
    // });

    // axiosPublic.get(`http://localhost:5000/reports`)
    // .then((res) => {
    //     setreports(res.data);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    fetch(url)
      .then((res) => res.json())
      .then((data) => setreports(data));
  }, [axiosPublic, url]);
  console.log(reports);

  const handleDelete = (id,RID) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
          //Deletereports
          fetch(`http://localhost:5000/reports/${RID}`, {
            method: "DELETE",
          })
          
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
  
              if (data.deletedCount > 0) {
                
                const remaining = reports.filter(
                  (reports) => reports._id !== id
                );
  
                setreports(remaining);
              }
            });

            //delete products




            fetch(`http://localhost:5000/products/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
    
                if (data.deletedCount > 0) {
                  Swal.fire("Deleted!", "This product has been deleted.", "success");
                //   const remaining = reports.filter(
                //     (reports) => reports._id !== id
                //   );
    
                //   setreports(remaining);
                }
              });

            
          }
    });
  };
  const handleKeep = (id) => {
    
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Keep it!",
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('keep');
            fetch(`http://localhost:5000/reports/${id}`, {
              method: "DELETE",
            })
            
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
    
                if (data.deletedCount > 0) {
                  Swal.fire("Keeped!", "This product has been Keeped.", "success");
                  const remaining = reports.filter(
                    (reports) => reports._id !== id
                  );
    
                  setreports(remaining);
                }
              });
          }
    });
  };

  
  return (
    <div>
      {/* <Helmet>
        <title>RoomJet-My products</title>
      </Helmet> */}

      <div className="overflow-x-auto my-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>

              
              <th>Who Reports</th>
              <th>Keep/Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}

            {reports.map((reports) => (
              <ReportedRow
                key={reports._id}
                reports={reports}
                handleDelete={handleDelete}
                handleKeep={handleKeep}
               
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reported;
