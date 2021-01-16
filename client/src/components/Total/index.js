import React from "react";
import "./style.css";

function Total(props) {
  // console.log("I am here: ", props.userSubscriptions);
  let total = [];

  for (let i = 0; i < props.userSubscriptions.length; i++) {
    total.push(props.userSubscriptions[i].paymentAmount);
  }

  total = total.reduce((a, b) => a + b, 0)

  console.log("This is our grand total:", total)

  return (
    <>
      <div className="card text-center text-light bg-dark m-3">
        <div className="card-header text-left">
          <strong>Your Total is:
            {total}
          </strong>
        </div>
        {/* <div className="card-body "> */}
        {/* {props.children} */}
        {/* </div> */}
      </div>
    </>
  );
}

export default Total;