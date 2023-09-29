import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function UserHeader() {
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
            {/* <span>{`${userData.data.email}`}</span> */}
          </p>
        </div>
        <nav>
          <ul className="flex-between dashboard-nav">
            <li>
              <Link
                to="/user/user-upload"
                className={isLinkActive("/user/user-upload")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                </svg>
                <p>Upload</p>
              </Link>
            </li>
            <li>
              <Link
                to="/user/user-photos"
                className={isLinkActive("/user/user-photos")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M513-200h226v12q0 17-11.5 29.5T699-144L189-80q-17 2-29.5-7.5T145-114L81-632q-2-17 7.5-29.5T115-676l86-10v80l-36 4 54 438 294-36Zm68-200q68 0 115.5-47T749-560q-68 0-116.5 47T581-400ZM321-280q-17 0-28.5-11.5T281-320v-520q0-17 11.5-28.5T321-880h520q17 0 28.5 11.5T881-840v520q0 17-11.5 28.5T841-280H321Zm260-120q-3-66-51.5-113T413-560q5 66 52.5 113T581-400Zm0-120q17 0 28.5-11.5T621-560v-10l10 4q15 6 30.5 3t23.5-17q9-15 6-32t-20-24l-10-4 10-4q17-7 19.5-24.5T685-700q-9-15-24-17.5t-30 3.5l-10 4v-10q0-17-11.5-28.5T581-760q-17 0-28.5 11.5T541-720v10l-10-4q-15-6-30-3.5T477-700q-8 14-5.5 31.5T491-644l10 4-10 4q-17 7-20 24t6 32q8 14 23.5 17t30.5-3l10-4v10q0 17 11.5 28.5T581-520Zm0-80q-17 0-28.5-11.5T541-640q0-17 11.5-28.5T581-680q17 0 28.5 11.5T621-640q0 17-11.5 28.5T581-600ZM361-360h440v-440H361v440ZM219-164Zm142-196v-440 440Z" />
                </svg>
                <p>Mes photos</p>
              </Link>
            </li>
            <li>
              <Link
                to="/user/user-update"
                className={isLinkActive("/user/user-update")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                </svg>
                <p>Mon profil</p>
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

export default UserHeader;
