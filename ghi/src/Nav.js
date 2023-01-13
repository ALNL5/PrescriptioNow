import { NavLink } from 'react-router-dom';


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg px-4 py-3 mb-4">
      <div className="container-fluid">
        <a className="navbar-brand link-dark" href="/">PrescriptioNow</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link link-dark" href="#">Pharmacy Login</a>
            <a className="nav-link link-dark" href="#">Delivery Login</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
