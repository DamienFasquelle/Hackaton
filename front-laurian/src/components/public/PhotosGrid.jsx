import React, { useState, useEffect } from "react";


function PhotosGrid() {

  const [images, setImages] = useState([]);



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
        {images.map((image, index) => (
          <article key={index} className="image-card">
            <img src={image.link} alt={image.description} className="image" />
            <button className="vote-btn btn">Voter</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PhotosGrid;
