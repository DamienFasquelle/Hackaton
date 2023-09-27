import { useState } from "react";
import Footer from "../../components/public/Footer";
import Header from "../../components/public/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const HandleSignupSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const passwordRegexLowercase = /[a-z]/;
    const passwordRegexUppercase = /[A-Z]/;
    const passwordRegexDigit = /[0-9]/;
    const passwordRegexSymbol = /[!@#$%^&*.+-]/;

    const isPasswordValid = (
      password.match(passwordRegexLowercase) &&
      password.match(passwordRegexUppercase) &&
      password.match(passwordRegexDigit) &&
      password.match(passwordRegexSymbol) &&
      password.length >= 8
    );

    if (!isPasswordValid) {
      Swal.fire({
        title: 'Erreur!',
        text: 'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, un symbole et doit avoir une longueur minimale de 8 caractères.',
        icon: 'error',
      });
      return;
    }
    const signinUserResponse = await fetch("http://localhost:3000/api/signin", {
      method: 'POST',
      body: JSON.stringify({ name, lastname, email, password }),
      headers: {
        'Content-type': 'application/json',
      },
    })

    if (signinUserResponse.status === 201) {
      Swal.fire({
        title: 'Inscription',
        text: 'Inscription réussite, bienvenue',
        icon: 'success',
      })
      setTimeout(() => {
        navigate("/connexion")
      }, 3000);
    } else {
      Swal.fire({
        title: 'Erreur!',
        text: 'Une erreur est survenue lors de votre inscription',
        icon: 'error',
      });
    }
  };

  return (
    <>
      <Header />
      <section className="bg-signup">
        <div className="main-container signup-section flex-column-start">
          <h2>Créer un compte</h2>
          <form
            className="signup-form flex-column-start"
            onSubmit={HandleSignupSubmit}
          >
            <div className="flex-between">
              <div className="form-element flex-column-start">
                <label htmlFor="name">
                  Prénom<span>*</span>
                </label>
                <input type="text" name="name" required />
              </div>
              <div className="form-element flex-column-start">
                <label htmlFor="lastname">
                  Nom<span>*</span>
                </label>
                <input type="text" name="lastname" required />
              </div>
            </div>
            <div className="form-element flex-column-start">
              <label htmlFor="email">
                E-mail<span>*</span>
              </label>
              <input id="email-input" type="email" name="email" required />
            </div>
            <div className="form-element flex-column-start">
              <label htmlFor="password">
                Mot de passe<span>*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
              />
            </div>
            <div className="form-element flex-between">
              <button
                className="btn btn-alt"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Cacher" : "Afficher"} le mot de passe
              </button>
              <input
                id="checkbox-cgu"
                type="checkbox"
                name="checkbox"
                required
              />
              <label htmlFor="checkbox">
                J'accepte les{" "}
                <a
                  href="/conditions-generales"
                  className="underline"
                  target="_blank"
                >
                  CGU
                </a>
                <span> *</span>
              </label>
            </div>
            <input
              type="submit"
              className="submit-btn btn btn-alt"
              value="Créer un compte"
            />
          </form>
          <div className="login-redirection">
            <p>Déjà un compte ?</p>
            <Link className="btn btn-alt" to="/connexion">
              Connectez-vous ici
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Signup;
