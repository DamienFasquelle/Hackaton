import React, { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";


const UserUploadForm = () => {
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
      const responseCreate = await fetch("http://localhost:3000/api/picture", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (responseCreate.status === 400) {
        Swal.fire({
          title: "Erreur",
          text: "Le fichier est vide",
          icon: "error",
        });
      } else if (responseCreate.status === 201) {
        setImage(null);
        setDescription("");
        Swal.fire({
          title: "Téléchargement réussi!",
          text: "Votre photo a bien été envoyée",
          icon: "success",
        });
      } else {
        const errorText = await responseCreate.text();
        Swal.fire({
          title: "Erreur!",
          text: "Veuillez remplir le champ description",
          icon: "error",
        });
        console.error("Erreur lors de l'envoi de l'image :", errorText);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande :", error);
      Swal.fire({
        title: "Erreur!",
        text: "Erreur lors de la demande au serveur",
        icon: "error",
      });
      window.location.reload();
    }
  };

  return (
    <section className="bg-upload">
      <div className="main-container upload-section flex-column-start">
        <h2>Uploader une photo</h2>{" "}
        <form
          className="upload-form form flex-column-start"
          onSubmit={handleSubmit}
        >
          <div className="form-element flex-column-start">
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <div className="form-element flex-column-start">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              className=""
              name="description"
              cols="25"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <input type="submit" className="submit-btn btn btn-alt" />
        </form>
      </div>
    </section>
  );
};

export default UserUploadForm;
