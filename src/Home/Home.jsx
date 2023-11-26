import React from "react";
import Baner from "./Baner";
import moment from "moment/moment";
import * as timeago from "timeago.js";
import TimeAgo from "timeago-react";

// import it first.
import vi from "timeago.js/lib/lang/vi";
import Trending from "./Trending";

const Home = () => {
  const data = [
    { id: 1, time: "2023-11-25 1:30:00 pm" },
    { id: 2, time: "2023-11-25 4:40:10 pm" },
    { id: 3, time: "2023-11-25 9:15:45 am" },
  ];

  const sortedData = data.sort((a, b) => {
    const timeA = new Date(a.time);
    const timeB = new Date(b.time);

    // Compare dates first
    if (timeA.toDateString() !== timeB.toDateString()) {
      return timeB - timeA;
    }

    // If the dates are the same, compare times
    return timeB.getTime() - timeA.getTime();
  });

  console.log(sortedData);

  const time = moment().format("YYYY-MM-DD h:mm:ss a");
  const sub = parseInt("2023-11-25 4:17:31 pm") - time;
  console.log(sub);
  console.log(time);
  return (
    <div className="max-w-6xl mx-auto my-2">
      <Baner />

      <Trending/>

      <TimeAgo datetime={"2023-11-25 4:17:31 pm"} />
    </div>
  );
};

export default Home;
