import React from "react";
import "./style.css";

// import user API and add logout function
import userAPI from "../../utils/userAPI";

function logout() {
  console.log("Logout btn was clicked!")
  userAPI.logout();
}



function Navbar(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Welcome {props.username}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>

            {/* added Logout button */}
            {props.username ?
              <li className="nav-item">
                <a className="nav-link active testButton" aria-current="page"
                  href="/"
                  onClick={() => logout()}
                >Logout</a>
              </li>
              : <> </>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;