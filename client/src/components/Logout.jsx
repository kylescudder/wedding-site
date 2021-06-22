import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const handleSubmit = async (e) => {
  history.push('/login')
}

function Logout() { 
  return (
    <div className="row">
      <div className="col">
      <form onSubmit={handleSubmit}>
                <button className="btn btn-outline-success me-2"
          type="submit"
        >
          Logout
        </button>
        </form>
      </div>
    </div>
  );
}

export default Logout;
