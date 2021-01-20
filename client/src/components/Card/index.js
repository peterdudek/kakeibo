import React from "react";

import placeholder from "../../img/IMG_1844.PNG";
import back from "../../img/backarrow.png";

function Card(props) {
  console.log("Yooo!: ", props.subscription.subscriptionName);
  return (
    <div>
      <div className="text-center">
      {props.subscription.subscriptionName}
        {/* <strong>{props.heading}: </strong> */}
      </div>
      <div className="text-center">
        <img src={props.subscription.logo} alt="company-logo" className="thumb"/>
        {/* {props.children} */}
        
        
        </div>
        <p className="text-center">Cost per month: ${props.subscription.paymentAmount}</p>
    </div>
  );
}

export default Card;