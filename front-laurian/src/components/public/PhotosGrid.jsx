import React, { useState, useEffect } from "react";

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

  return (
    <section className="main-container photos-section homepage-section">
      <h2>Photographies</h2>
      <div className="image-grid">
        {images.map(
          (image, index) =>
            image.status === "publié" && (
              <>
                <article key={index} className="image-card">
                  <img
                    src={image.link}
                    alt={image.description}
                    className="image"
                    onClick={() => openModal(image.link)}
                  />
                  <button className="vote-btn btn">Voter</button>
                </article>
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
            )
        )}
      </div>
    </section>
  );
}

export default PhotosGrid;
