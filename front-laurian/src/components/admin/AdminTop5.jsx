import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AdminTop5() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const response = await fetch(`http://localhost:3000/api/picture/topFive`);
    const responseJs = await response.json();
    setImages(responseJs.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="...">
      <h2>TOP 5</h2>
      <div className="top5-grid flex-center">
        {images.map((image, index) => (
          <article key={index} className="top5-card">
            <img src={image.link} alt={image.description} className="image" />
            <div className="nbr-votes">
              <p>{image.numberOfVotes}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AdminTop5;
