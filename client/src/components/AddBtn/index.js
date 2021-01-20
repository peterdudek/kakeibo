import React from "react";
import "./style.css";
import plus from "../../img/plus.png";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function AddBtn(props) {
  return (
    <div>
    <span className="add-btn" {...props} role="button" tabIndex="1">
      <img src={plus} alt="plus-sign" height="20px"/>
    </span>
    </div>
  );
}

export default AddBtn;
