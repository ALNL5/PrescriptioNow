import { useToken } from "./auth";
import { Link } from "react-router-dom";

function Nav() {
  const [token] = useToken();

  return (
    <nav className="navbar navbar-expand-lg px-4 py-3 mb-4">
      <div className="container-fluid">
        <a className="navbar-brand link-dark" href="/">
          PrescriptioNow
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <li className={token ? "d-none" : "nav-link link-dark"}>
              Welcome!
            </li>
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
