import React, { useEffect, useState } from "react";
import UserHeader from "../../components/user/UserHeader";
import UserFooter from "../../components/user/UserFooter";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { ImageList, ImageListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserPhotos() {
  const [userPhotos, setUserPhotos] = useState([]);

  const navigate = useNavigate();

  // Fonction pour ouvrir la modale
  function openModal(imageSrc) {
    var modal = document.getElementById("myModal");
    var modalImage = document.getElementById("modalImage");

    modal.style.display = "block";
    modalImage.src = imageSrc;
  }

  // Fonction pour fermer la modale
  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  // Fonction pour supprimer une photo par son ID
  const handleDeletePhoto = async (photoId) => {
    try {
      const jwt = Cookies.get("jwt");
      const response = await fetch(
        `http://localhost:3000/api/picture/${photoId}`,
        {
          method: "DELETE",
          headers: {
            // "Authorization": `Bearer ${jwt}`,
          },
        }
      );

      if (response.ok) {
        // Photo supprimée avec succès, mettez à jour la liste des photos
        const updatedPhotos = userPhotos.filter(
          (photo) => photo.id !== photoId
        );
        setUserPhotos(updatedPhotos);
      } else {
        console.error("Erreur lors de la suppression de la photo.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  const fetchUserPhotos = async () => {
    try {
      const jwt = Cookies.get("jwt");
      const user = jwtDecode(jwt);

      const responseApi = await fetch("http://localhost:3000/api/picture");
      if (!responseApi.ok) {
        throw new Error(
          "Erreur lors de la récupération des photos de l'utilisateur"
        );
      }
      const responseApiJson = await responseApi.json();

      const filteredPhotos = responseApiJson.data.filter(
        (photo) => photo.UserId === user.data.id
      );

      setUserPhotos(filteredPhotos);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
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
          Cookies.remove("jwt");
          navigate("/connexion");
        }
      } catch (error) {
        console.error("Erreur lors du décodage du jeton JWT :", error);
        navigate("/connexion");
      }
    }
    fetchUserPhotos();
  }, []);

  return (
    <>
      <UserHeader />
      <section className="user-photos-section main-container">
        <h2>Mes photos</h2>
        <ImageList variant="masonry" cols={3} gap={25} className="masonry">
          {userPhotos.length === 0 ? (
            <div className="validate-nul-msg">
              <p>Aucune image uploadée</p>
            </div>
          ) : (
            <>
              {userPhotos.map((photo) => (
                <div key={photo.id}>
                  <ImageListItem className="user-photo-card">
                    <img
                      src={photo.link}
                      alt={photo.description}
                      onClick={() => openModal(photo.link)}
                    />
                    <div className="flex-center infos">
                      <p>{photo.status + "e"}</p>
                      {photo.status === "publié" && (
                        <p>
                          Votes :{" "}
                          <span className="bold">{photo.numberOfVotes}</span>
                        </p>
                      )}
                      {photo.status === "non publié" && (
                        <button
                          className="btn delete-btn"
                          onClick={() => handleDeletePhoto(photo.id)}
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </ImageListItem>
                  <div
                    id="myModal"
                    className="modal"
                    onClick={() => closeModal()}
                  >
                    <button className="close btn" onClick={() => closeModal()}>
                      X
                    </button>
                    <img
                      id="modalImage"
                      className="modal-content"
                      src=""
                      alt="Image agrandie"
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </ImageList>
      </section>
      <UserFooter />
    </>
  );
}

export default UserPhotos;
