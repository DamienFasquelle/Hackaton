import Footer from "../../components/public/Footer";
import Header from "../../components/public/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const HandleLoginSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const loginResponse = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email, password }),
    });
    const responseJson = await loginResponse.json();

    if (loginResponse.status === 201) {
      const jwt = await responseJson.data;
      Cookies.set("jwt", await jwt);
      const jwtUser = Cookies.get("jwt");
      const user = await jwtDecode(jwtUser);
      setTimeout(() => {
        if (user.data.role === 1) {
          navigate("/admin/admin-dashboard");
        } else {
          navigate("/user/user-upload");
        }
      }, 0);
    } else {
      Swal.fire({
        title: "Erreur!",
        text: "Une erreur est survenue lors de votre inscription",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Header />
      <section className="bg-login">
        <div className="main-container login-section flex-column-start">
          <h2>Connexion</h2>
          <form
            onSubmit={HandleLoginSubmit}
            className="login-form flex-column-start"
          >
            <div className="form-element flex-column-start">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" />
            </div>
            <div className="form-element flex-column-start">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" name="password" />
            </div>
            <input
              type="submit"
              className="submit-btn btn btn-alt"
              value="Se connecter"
            />
          </form>
          <div className="signup-redirection">
            <p>Pas encore de compte ?</p>
            <Link className="btn btn-alt" to="/inscription">
              Inscrivez-vous ici
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
