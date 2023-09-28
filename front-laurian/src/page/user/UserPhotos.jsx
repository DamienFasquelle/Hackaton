import React, { useEffect, useState } from "react";
import UserHeader from "../../components/user/UserHeader";
import Footer from "../../components/public/Footer";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { ImageList, ImageListItem } from "@mui/material";

function UserPhotos() {
  const [userPhotos, setUserPhotos] = useState([]);

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
                <>
                  {" "}
                  <ImageListItem key={photo.id} className="user-photo-card">
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
                    </div>
                  </ImageListItem>
                  <div id="myModal" class="modal" onClick={() => closeModal()}>
                    <button class="close btn" onClick={() => closeModal()}>
                      X
                    </button>
                    <img
                      id="modalImage"
                      class="modal-content"
                      src=""
                      alt="Image agrandie"
                    />
                  </div>
                </>
              ))}
            </>
          )}
        </ImageList>
      </section>
      <Footer />
    </>
  );
}

export default UserPhotos;
