import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const UserUploadForm = () => {
  const navigate = useNavigate();
  //   const token = Cookies.get("jwt");

  const handleUploadPicture = async (event) => {
    event.preventDefault();

    const fileData = {
      description: event.target.description.value,
    };

    const formData = new FormData();

    formData.append("file", event.target.file.files[0]);
    formData.append("data", JSON.stringify(fileData));

    // const token = Cookies.get("jwt");

    const responseCreate = await fetch(
      "http://localhost:3000/myPhotos/picture",
      {
        method: "POST",
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseCreateJs = await responseCreate.json();

    console.log(responseCreate);

    // if (responseCreate.status === 201) {
    //   navigate("/user/user-photos");
    // }
  };

  useEffect(() => {
    // if (!Cookies.get("jwt")) {
    //   navigate("/login");
    // }
  }, []);

  return (
    <form className="upload-form blur" onSubmit={handleUploadPicture}>
      <h3>Uploader une photo</h3>
      <div className="upload-input flex">
        <input
          type="file"
          id="file"
          name="file"
          //   accept="image/png, image/jpeg"
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" />
      </div>
      <input type="submit" className="submit-btn" />
    </form>
  );
};

export default UserUploadForm;
