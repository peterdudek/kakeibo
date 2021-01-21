import React, { useEffect, useState } from "react";
// import ProtectedRoute from "../ProtectedRoute";
// import { Route, Redirect } from "react-router-dom";

import placeholder from "../../img/IMG_1844.PNG";
import back from "../../img/backarrow.png";
// import streamingAPI from "../../utils/streamingAPI";

import API from "../../utils/API";




function Card(props) {
  const [show, setShow] = useState({});

  function handleFormSubmit(event) {
    event.preventDefault();
    // console.log("Good job: ", event.target.value);
    // showMovie();

    // streamingAPI.findShows()
    //   .then((res) => setShow(res.data))
    //   .catch((err) => console.log(err));

    API.findShows()
      .then((res) => {
        console.log(res)
        setShow(res.data.results)
      }
      )
      .catch((err) => console.log(err));


  }





  console.log("Yooo!: ", props.subscription.subscriptionName);
  return (
    <div>
      <div className="text-center">
        {props.subscription.subscriptionName}
        {/* <strong>{props.heading}: </strong> */}
      </div>
      <div className="text-center">
        <img src={props.subscription.logo} alt="company-logo" className="thumb" />
        {/* {props.children} */}


      </div>
      <p className="text-center">Cost per month: ${props.subscription.paymentAmount}</p>

      <button
        onClick={handleFormSubmit}
      >What to watch?
        </button>

      {show.length > 0 ?

        show.map((singleShow, i) => (
          <div key={i}>
            {singleShow.title}
          </div>
        )
        )
  : <div></div>
      }

      </div>
    )  
}

export default Card;