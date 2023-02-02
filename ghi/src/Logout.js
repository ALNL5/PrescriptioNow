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
          <div className="p-4 mt-5">
            <h1 className="text-center mt-4 mb-4">Sign-out success</h1>
            <form id="create-account-form">
              <button
                className="btn btn-primary d-grid gap-2 col-4 mx-auto"
                onClick={handleDelete}
              >
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
