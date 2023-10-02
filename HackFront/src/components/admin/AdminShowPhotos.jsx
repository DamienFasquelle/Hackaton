import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AdminShowPhotos() {
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
    <div className="...">
      <h2>Toutes les photos</h2>
      <div className="admin-photos-grid">
        {images.map((image, index) => (
          <article key={index} className="admin-photo-card">
            <img src={image.link} alt={image.description} className="image" />
          </article>
        ))}
      </div>
    </div>
  );
}

export default AdminShowPhotos;
