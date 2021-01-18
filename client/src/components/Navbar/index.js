import React from "react";
import "./style.css";
import logoEl from "../../img/IMG_1844.PNG";

// import user API and add logout function
import userAPI from "../../utils/userAPI";

function logout() {
  console.log("Logout btn was clicked!")
  userAPI.logout();
}



function Navbar(props) {

  // const logged = props.username;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white borderline">
      <div>
        <img alt="kakeibo-symbol" src={logoEl} height="50px" />
      </div>
      <div className="container-fluid">
        {props.username &&
        <a className="navbar-brand" href="/">Hi {props.username}</a>}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="inner">
          <h1 className='kakeiboFont'>Kakeibo 家計簿</h1>
          {/* <h1 className='mt-0 ml-0 mb-3 text-dark p-4 pt-3 pl-3 kakeiboFont'>Kakeibo 家計簿</h1> */}
          </div>
        <div className="collapse navbar-collapse d-flex" id="navbarNav">
          <ul className="navbar-nav ml-auto p-2 col-example">
            <li className="nav-item borders">
            {props.username &&
              <a className="nav-link active" aria-current="page" href="/">Home</a>}
            </li>

            {/* added Logout button */}
            {props.username ?
            <li className="nav-item borders">
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
      {/* <div>
        <ul className="navbar-nav">
          {props.username ?
            <li className="nav-item borders">
              <a className="nav-link active testButton" aria-current="page"
                href="/"
                onClick={() => logout()}
              >Logout</a>
            </li>
            : <> </>
          }
        </ul>
      </div> */}
    </nav>
  )
}

export default Navbar;