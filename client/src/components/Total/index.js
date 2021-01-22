import React from "react";
import "./style.css";

export function Total(props) {
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
        d-flex justify-content-between
        ">
      <div><strong>TOTAL: {" $"}{total}</strong></div>
      {/* <div><span>{" $"}{total}</span></div> */}
    </div>
  );
}

export function Average(props) {
  // console.log("I am here: ", props.userSubscriptions);
  let average = [];

  for (let i = 0; i < props.userSubscriptions.length; i++) {
    average.push(props.userSubscriptions[i].paymentAmount);
  }

  average = average.reduce((a, b) => a + b, 0)
  average = average / props.userSubscriptions.length
  average = average.toFixed(2);

  // console.log("This is our grand total:", total);

  return (
    <div className="
        tableRound
        hidden
        d-flex justify-content-between
        ">
      <div><strong>AVERAGE: {" $"}{average}</strong></div>
      {/* <div><span>{" $"}{total}</span></div> */}
    </div>
  );
}


// export default Total;