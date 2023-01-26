import { useToken } from "./auth";

function Logout() { 
    debugger;
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
                    <h1>Logout</h1>
                    <form id="create-account-form">
                    <button className="btn btn-primary" onClick={handleDelete}>
                        Logout
                    </button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Logout;