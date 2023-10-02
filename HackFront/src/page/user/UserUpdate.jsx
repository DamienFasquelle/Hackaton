import React, { useState, useEffect } from "react";
import UserHeader from "../../components/user/UserHeader";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import UserFooter from "../../components/user/UserFooter";
import { useNavigate } from "react-router-dom";

function UserUpdate() {
  const [actualPassword, setactualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const jwt = Cookies.get("jwt");
  const user = jwtDecode(jwt);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!actualPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        title: "Erreur!",
        text: "Tout les champs sont requis",
        icon: "error",
      });
      return;
    }

    if (actualPassword != user.data.password) {
      Swal.fire({
        title: "Erreur!",
        text: "Mot de passe incorrect",
        icon: "error",
      });
      return;
    }
    const passwordRegexLowercase = /[a-z]/;
    const passwordRegexUppercase = /[A-Z]/;
    const passwordRegexDigit = /[0-9]/;
    const passwordRegexSymbol = /[!@#$%^&*.+-]/;

    const isPasswordValid =
      newPassword.match(passwordRegexLowercase) &&
      newPassword.match(passwordRegexUppercase) &&
      newPassword.match(passwordRegexDigit) &&
      newPassword.match(passwordRegexSymbol) &&
      newPassword.length >= 8;

    if (!isPasswordValid) {
      Swal.fire({
        title: "Erreur!",
        text: "Le nouveau mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, un symbole et doit avoir une longueur minimale de 8 caractères.",
        icon: "error",
      });
      return;
    }

    if (isPasswordValid !== confirmPassword) {
      Swal.fire({
        title: "Erreur!",
        text: "Les nouveaux mot de passe ne correspondent pas",
        icon: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/${user.data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
          body: JSON.stringify({
            actualPassword: actualPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          }),
        }
      );
      if (response.status === 200) {
        Swal.fire("Réussi !", "Mot de passe changé avec succès", "success");
      } else {
        setErrorMessage("Mot de passe actuel incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe :", error);
      setErrorMessage(
        "Une erreur s'est produite lors du changement de mot de passe."
      );
    }
  };

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      navigate("/connexion");
    } else {
      try {
        const user = jwtDecode(jwt);
        if (user.data.id !== 2) {
          navigate("/connexion");
        }
      } catch (error) {
        console.error("Erreur lors du décodage du jeton JWT :", error);
        navigate("/connexion");
      }
    }
  }, []);

  return (
    <>
      <UserHeader />
      <section className="update-section main-container flex-column-start">
        <h2>Changer le mot de passe</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form
          onSubmit={handleChangePassword}
          className="update-form flex-column-start"
        >
          <button
            className="show-button"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
              </svg>
            )}
          </button>
          <div className="form-element flex-column-start">
            <label htmlFor="actualPassword">Mot de passe actuel</label>
            <input
              type={showPassword ? "text" : "password"}
              name="actualPassword"
              value={actualPassword}
              onChange={(e) => setactualPassword(e.target.value)}
            />
          </div>
          <div className="form-element flex-column-start">
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-element flex-column-start">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-alt">
            Changer le mot de passe
          </button>
        </form>
      </section>
      <UserFooter />
    </>
  );
}

export default UserUpdate;
