import React, { useEffect, useState } from "react";
import UserHeader from "../../components/user/UserHeader";
import Footer from "../../components/public/Footer";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

function UserPhotos() {
  const [userPhotos, setUserPhotos] = useState([]);

  const fetchUserPhotos = async () => {
    try {
      const jwt = Cookies.get("jwt");
      const user = jwtDecode(jwt);

      const responseApi = await fetch("http://localhost:3000/api/picture");
      if (!responseApi.ok) {
        throw new Error("Erreur lors de la récupération des photos de l'utilisateur");
      }
      const responseApiJson = await responseApi.json();

      const filteredPhotos = responseApiJson.data.filter((photo) => photo.UserId === user.data.id);


      setUserPhotos(filteredPhotos);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };
  useEffect(() => {
    fetchUserPhotos();
  }, []);

  return (
    <>
      <UserHeader />
      <div className="photo-list">
        <h1>Mes photos</h1>
        {userPhotos.length === 0 ? (
          <p>Aucune photo disponible</p>
        ) : (
          <ul>
            {userPhotos.map((photo) => (
              <li key={photo.id}>
                <img src={photo.link} alt="" />
                <div>
                  <p>Statut : {photo.status}</p>
                  {photo.status === "publié" && (
                    <p>Nombre de votes : {photo.numberOfVotes}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}

export default UserPhotos