import React, { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserUploadForm = () => {

  const navigate = useNavigate()

  const token = Cookies.get("jwt");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      const responseCreate = await fetch(
        "http://localhost:3000/api/picture",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (responseCreate.status === 201) {
        Swal.fire({
          title: 'Téléchargée',
          text: 'Téléchargement réussie',
          icon: 'success',
        })
        setTimeout(() => {
          navigate("/user/user-photos")
        }, 3000);
      } else {
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors du téléchargement, contenue déjà présent',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Erreur!',
        text: 'Erreur serveur, veuillez réessayer plus tard',
        icon: 'error',
      });
    }
  };

  return (
    <form className="upload-form blur" onSubmit={handleSubmit}>
      <h3>Uploader une photo</h3>
      <div className="upload-input flex">
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <input type="submit" className="submit-btn" />
    </form>
  );
};

export default UserUploadForm;
