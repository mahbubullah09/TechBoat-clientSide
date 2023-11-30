import {  Link, useRouteError } from "react-router-dom";
import image from '../assets/Frame.png'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className=" text-center h-full mt-10 grid place-content-center">
 <img src={image} />
 <Link to={'/'}><button  className="rounded py-1 px-4 bg-orange-500 text-white">Go To Home</button></Link>
 
    </div>
  );
}