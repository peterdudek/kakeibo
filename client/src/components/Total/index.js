import React from "react";
import "./style.css";

function Total(props) {
  // console.log("I am here: ", props.userSubscriptions);
  let total = [];

  for (let i = 0; i < props.userSubscriptions.length; i++) {
    total.push(props.userSubscriptions[i].paymentAmount);
  }

  total = total.reduce((a, b) => a + b, 0).toFixed(2);

  // console.log("This is our grand total:", total);

  return (
    <div className="
        tableRound
        hidden
        d-flex justify-content-between">
      <div><strong>TOTAL: {" "}</strong></div>
      <div><span>${total}</span></div>
    </div>
  );
}

export default Total;