import React, { useState } from "react";
import UserHeader from "../../components/user/UserHeader";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

function UserUpdate() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const jwt = Cookies.get("jwt");
  const user = jwtDecode(jwt);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Vérifiez si les champs de mot de passe sont valides
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Tous les champs sont requis.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    // Envoyer une requête au serveur pour changer le mot de passe
    try {
      const response = await fetch(`http://localhost:3010/api/${user.data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.status === 200) {
        setSuccessMessage("Mot de passe changé avec succès !");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMessage("");
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
          {successMessage && <div className="success-message">{successMessage}</div>}
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
