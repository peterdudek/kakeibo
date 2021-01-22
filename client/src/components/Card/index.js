import React, { useEffect, useState } from "react";
// import ProtectedRoute from "../ProtectedRoute";
// import { Route, Redirect } from "react-router-dom";
import { Col, Row } from "../Grid";
import placeholder from "../../img/IMG_1844.PNG";
import back from "../../img/arrow-b.png";
// import streamingAPI from "../../utils/streamingAPI";
import { FormBtn } from "../Form";
import API from "../../utils/API";
import "./style.css";


function Card(props) {
  const [show, setShow] = useState({});

  function handleFormSubmit(event) {
    event.preventDefault();
    const q = props.subscription.subscriptionName.toLowerCase();
    console.log("MY q:", q);
    API.findShows(q)
      .then((res) => {
        // console.log(res)
        setShow(res.data.results)
      })
      .catch((err) => console.log(err));
  }

  // console.log("Yooo!: ", props.subscription.subscriptionName);
  return (
    <div className="scrollableCard">
      

      {/* <div className="extraMargin">
      <div className="text-left">
        <strong>
        {props.subscription.subscriptionName}
        </strong>

      </div>
      <div className="text-left">
        <img src={props.subscription.logo} alt="company-logo" className="thumb" />


      </div>
      <p className="text-left">Cost per month: ${props.subscription.paymentAmount}</p>
      </div> */}

      <FormBtn
        onClick={handleFormSubmit}
      >
        What to watch?
        </FormBtn>
      <Row>
        {show.length > 0 ?

          show.map((singleShow, i) => (
            // <Row>
              <div key={i} className="cardMargin">
                <h5 className="card-header">{singleShow.title} {" ("}{singleShow.year}{")"}</h5>
                <div className="holder">
                  <img src={singleShow.backdropURLs.original} />
                </div>
                {/* <div className="holder">
                  <img src={singleShow.posterURLs.original} />
                </div> */}
                <p className="card-text">Rating: {singleShow.imdbRating}</p>
                <div 
                className="card"
                >
                  <h5 className="card-title">Overview</h5>
                  <p className="card-text">{singleShow.overview}</p>
                  <h5 className="card-title">Cast</h5>
                  <p className="card-text">{singleShow.cast.join(", ")}</p>
                  {/* <a href={singleShow.streamingInfo.netflix.us.link} className="btn btn-primary" target="_blank">Link</a> */}

                </div>
              </div>
            // </Row>
          )
          )
          : <div></div>
        }
      </Row>
    </div>
  )
}

export default Card;