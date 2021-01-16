import React, { useState } from "react";
import "./style.css";


function Total(props) {
  // const [userState, setUserState] = useState({});
  console.log(props.userSubscriptions[0]);
  // let value;

  // value = props.userSubscriptions[0].paymentAmount + props.userSubscriptions[1].paymentAmount
  

  // const [subscriptions, setSubscriptions] = useState({
  //   subscriptionName: props.userSubscriptions.subscriptionName,
	// 	paymentAmount: props.userSubscriptions.paymentAmount,
	// 	username: props.userSubscriptions.username,

  // });

  // for(var i = 0; i < props.userSubscriptions; i++) {
    
  //   total.push(parseInt(props.userSubscriptions[i].paymentAmount))
  // }
  // console.log(total);

  return (
    <>
    <div className="card text-center text-light bg-dark m-3">
      <div className="card-header text-left">
        <strong>Your Total is: 
          {/* {value} */}
          </strong>
      </div>


      <div className="card-body ">
        {/* {props.children} */}
        </div>
    </div>
    </>
  );
}

export default Total;