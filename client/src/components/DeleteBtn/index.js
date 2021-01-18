import React from "react";
import "./style.css";
import minus from "../../img/minus.png";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <div>
    <span className="delete-btn" {...props} role="button" tabIndex="0">
    <img src={minus} alt="minus-sign" height="20px"/>
    </span>
    </div>
  );
}

export default DeleteBtn;
