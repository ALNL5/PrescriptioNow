import { useToken } from "./auth";
import { Link } from "react-router-dom";
import { LineUtil } from "leaflet";

function Nav() {
  const [token] = useToken();

  return (
    <nav className="navbar navbar-expand-lg px-4 py-3 mb-4">
      <div className="container-fluid">
        <a className="navbar-brand link-dark" href="/">
          PrescriptioNow
        </a>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          {/* <div className="navbar-nav">
            <li className={token ? "d-none" : "nav-link link-dark"}>
              Please login
            </li>
          </div> */}
          <div className="navbar-nav">
            <Link
              className={token ? "btn btn-primary" : "d-none"}
              to={"accounts/logout"}
              role="button"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
