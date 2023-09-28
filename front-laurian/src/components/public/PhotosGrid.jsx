import React, { useState, useEffect } from "react";
import { ImageList, ImageListItem } from "@mui/material";

function PhotosGrid() {
  const [images, setImages] = useState([]);

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

  const fetchImages = async () => {
    const response = await fetch(`http://localhost:3000/api/picture`);
    const responseJs = await response.json();
    setImages(responseJs.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Random
  const randomImages = [...images];
  for (let i = randomImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomImages[i], randomImages[j]] = [randomImages[j], randomImages[i]];
  }

  return (
    <section className="main-container photos-section homepage-section">
      <h2>Photographies</h2>
      <ImageList variant="masonry" cols={3} gap={25} className="masonry">
        {randomImages.map(
          (image, index) =>
            image.status === "publié" && (
              <>
                <ImageListItem key={index} className="image-card">
                  <img
                    src={image.link}
                    alt={image.description}
                    className="image"
                    onClick={() => openModal(image.link)}
                  />
                  <button className="vote-btn btn">Voter</button>
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
              </>
            )
        )}
      </ImageList>
    </section>
  );
}

export default PhotosGrid;
