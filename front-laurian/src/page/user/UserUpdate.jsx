import React, { useState } from "react";
import UserHeader from "../../components/user/UserHeader";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

function UserUpdate() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const jwt = Cookies.get("jwt");
  const user = jwtDecode(jwt);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Tous les champs sont requis.");
      return;
    }

    if (newPassword != user.data.password) {

      setErrorMessage("Mot de passe incorrect");
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    // Envoyer une requête au serveur pour changer le mot de passe
    try {
      const response = await fetch(`http://localhost:3000/api/${user.data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });
      console.log(response.status)
      if (response.status === 200) {

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMessage("");
        Swal.fire(
          "Réussis !",
          "Mot de passe changé avec succès",
          "success"
        );
      } else {
        setErrorMessage("Mot de passe actuel incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe :", error);
      setErrorMessage("Une erreur s'est produite lors du changement de mot de passe.");
    }
  };

  return (
    <>
      <UserHeader />
      <section className="change-password-section">
        <div className="main-container">
          <h2>Changer le mot de passe</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleChangePassword}>
            <div className="form-element">
              <label htmlFor="currentPassword">Mot de passe actuel</label>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-element">
              <label htmlFor="newPassword">Nouveau mot de passe</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-element">
              <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit">Changer le mot de passe</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default UserUpdate;
