import { useToken } from "./auth";

function Logout() {
    const token = useToken();
    const logoutUser = token[2];
    function handleDelete(e) {
        e.preventDefault();
        logoutUser();
    }

    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Sign-out Success</h1>
              <form id="create-account-form">
                <button className="btn btn-primary" onClick={handleDelete}>
                  Home Page
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Logout;
