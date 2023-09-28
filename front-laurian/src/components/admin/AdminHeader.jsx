import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function AdminHeader() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isLinkActive = (linkPath) => {
    return currentPath === linkPath ? "active" : "";
  };

  const navigate = useNavigate();

  const handleClickDeleteCookies = () => {
    Cookies.remove("jwt");
    navigate("/connexion");
  };

  const jwt = Cookies.get("jwt");
  const userData = jwtDecode(jwt);
  return (
    <>
      <header className="dashboard-header flex-between">
        <div className="welcome">
          <p>
            Bienvenue
            {/* <span>{`${}`}</span> */}
          </p>
        </div>
        <nav>
          <ul className="flex-between dashboard-nav">
            <li>
              <Link
                to="/admin/admin-dashboard"
                className={isLinkActive("/admin/admin-dashboard")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
                </svg>
                <p>Dashboard</p>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/admin-validate"
                className={isLinkActive("/admin/admin-validate")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M513-200h226v12q0 17-11.5 29.5T699-144L189-80q-17 2-29.5-7.5T145-114L81-632q-2-17 7.5-29.5T115-676l86-10v80l-36 4 54 438 294-36Zm68-200q68 0 115.5-47T749-560q-68 0-116.5 47T581-400ZM321-280q-17 0-28.5-11.5T281-320v-520q0-17 11.5-28.5T321-880h520q17 0 28.5 11.5T881-840v520q0 17-11.5 28.5T841-280H321Zm260-120q-3-66-51.5-113T413-560q5 66 52.5 113T581-400Zm0-120q17 0 28.5-11.5T621-560v-10l10 4q15 6 30.5 3t23.5-17q9-15 6-32t-20-24l-10-4 10-4q17-7 19.5-24.5T685-700q-9-15-24-17.5t-30 3.5l-10 4v-10q0-17-11.5-28.5T581-760q-17 0-28.5 11.5T541-720v10l-10-4q-15-6-30-3.5T477-700q-8 14-5.5 31.5T491-644l10 4-10 4q-17 7-20 24t6 32q8 14 23.5 17t30.5-3l10-4v10q0 17 11.5 28.5T581-520Zm0-80q-17 0-28.5-11.5T541-640q0-17 11.5-28.5T581-680q17 0 28.5 11.5T621-640q0 17-11.5 28.5T581-600ZM361-360h440v-440H361v440ZM219-164Zm142-196v-440 440Z" />
                </svg>
                <p>Photos en attente</p>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/admin-updatecgu"
                className={isLinkActive("/admin/admin-updatecgu")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
                </svg>
                <p>CGU</p>
              </Link>
            </li>
          </ul>
        </nav>
        <button className="logout-btn btn" onClick={handleClickDeleteCookies}>
          <p>Déconnexion</p>
        </button>
      </header>
    </>
  );
}

export default AdminHeader;
