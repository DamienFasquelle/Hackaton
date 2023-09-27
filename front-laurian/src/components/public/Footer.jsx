import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="main-container">
        <p>
          Copyright © {new Date().getFullYear()}&nbsp;
          <Link className="underline" to="/">
            concours-myphotos.fr
          </Link>{" "}
          •
          <Link className="underline" to="/conditions-generales">
            {" "}
            CGU
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
