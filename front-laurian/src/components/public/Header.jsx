import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="main-header">
      <div className="main-container flex-between">
        <Link to="/">
          <div className="flex-center title-wrap">
            <p>Concours</p>
            <img
              className="header-logo"
              src="/images/logo1.png"
              alt="logo-myphotos"
            />
          </div>
        </Link>
        <nav className="main-nav">
          <ul className="flex-between">
            <li className="underline">
              <Link to="/">Accueil</Link>
            </li>
            <li className="underline">
              <Link to="/connexion">Connexion / Inscription</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
