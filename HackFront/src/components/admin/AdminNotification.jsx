import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AdminNotification() {
  const [images, setImages] = useState([]);
  const [unpublished, setUnpublished] = useState([]);

  const fetchImages = async () => {
    const response = await fetch(`http://localhost:3000/api/picture`);
    const responseJs = await response.json();
    setImages(responseJs.data);

    const unpublishedImages = responseJs.data.filter((image) =>
      image.status.includes("non")
    );

    setUnpublished(unpublishedImages);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const notificationClass =
    unpublished.length === 0 ? "no-images" : "has-images";

  return (
    <div className={`notification-card flex-between ${notificationClass}`}>
      {unpublished.length === 0 && <p>Aucune image en attente de validation</p>}
      {unpublished.length >= 1 && (
        <>
          <p>Des images sont en attente de validation</p>
          <Link to="/admin/admin-validate" className="btn">
            {" "}
            Y aller
          </Link>
        </>
      )}
    </div>
  );
}

export default AdminNotification;
