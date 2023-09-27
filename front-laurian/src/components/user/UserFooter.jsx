import { Link } from "react-router-dom";

function UserFooter() {
  return (
    <>
      <footer className="dashboard-footer">
        <Link to="/">
          <p className="homepage-link underline">
            {" "}
            {"<"} Retourner sur le site
          </p>
        </Link>
      </footer>
    </>
  );
}

export default UserFooter;
