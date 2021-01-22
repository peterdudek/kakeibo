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
    const q = props.subscription.subscriptionName.toLowerCase().split(" ")[0]
    // console.log("MY query:", q);
    API.findShows(q)
      .then((res) => {
        // console.log(res)
        setShow(res.data.results)
      })
      .catch((err) => console.log(err));
  }

  // console.log("Yooo!: ", props.subscription.subscriptionName);
  return (
    <>
      <div className="centerShowBtn">
        <FormBtn
          onClick={handleFormSubmit}
        >
          What to watch?
    </FormBtn>
      </div>

    {show.length > 0 &&
      <div className="scrollableCard">

        <Row>
          {show.length > 0 ?

            show.map((singleShow, i) => (
              // <Row>
              <div key={i} className="cardMargin">
                <div className="holder">
                <h5>{singleShow.title} {" ("}{singleShow.year}{")"}</h5>
                </div>
                {/* <hr></hr> */}
                <div className="holder">
                  <img src={singleShow.backdropURLs.original} />
                </div>
                {/* <div className="holder">
                  <img src={singleShow.posterURLs.original} />
                </div> */}
                <div className="holder">
                <p 
                // className="card-text"
                >Rating: {singleShow.imdbRating}</p>
                </div>
                <div
                  // className="card"
                >
                  <h5 
                  // className="card-title"
                  >Overview</h5>
                  <p 
                  // className="card-text"
                  >{singleShow.overview}</p>
                  <h5 
                  // className="card-title"
                  >Cast</h5>
                  <p
                  // className="card-text"
                  >{singleShow.cast.join(", ")}</p>
                  {/* <a href={singleShow.streamingInfo.netflix.us.link} className="btn one btn-dark rounded-15" target="_blank">Link</a> */}

                </div>
                <hr></hr>
              </div>
              // </Row>
            )
            )
            : <div></div>
          }

        </Row>
      </div>}


    </>
  )
}

export default Card;