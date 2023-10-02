import { useState, useEffect } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import UserFooter from "../../components/user/UserFooter";
import Swal from "sweetalert2";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function AdminUpdateCGU() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const navigate = useNavigate();

  const fetchCGU = async () => {
    const response = await fetch(`http://localhost:3000/api/CGU`);
    const responseJs = await response.json();

    const contentState = convertFromRaw(JSON.parse(responseJs.data.text));
    setEditorState(EditorState.createWithContent(contentState));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const messageText = JSON.stringify(rawContentState);

    Swal.fire({
      title: "Êtes-vous sûr de vouloir publier ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Publier",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/api/CGU", {
          method: "PUT",
          body: JSON.stringify({ text: messageText }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          // .then((response) => response.json())
          .then(() => {
            Swal.fire(
              "Publié !",
              "Vos CGU ont été publiées avec succès.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Une erreur s'est produite :", error);
          });
      }
    });
  };

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      navigate("/connexion");
    } else {
      try {
        const user = jwtDecode(jwt);
        if (user.data.id !== 1) {
          Cookies.remove("jwt");
          navigate("/connexion");
        }
      } catch (error) {
        console.error("Erreur lors du décodage du jeton JWT :", error);
        navigate("/connexion");
      }
    }
    fetchCGU();
  }, []);
  return (
    <>
      <AdminHeader />
      <section className="main-container update-cgu-section">
        <h2>Modifier les CGU</h2>
        <div className="div">
          <form onSubmit={handleSubmitForm}>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
            <br />
            <button type="submit" className="btn btn-alt">
              Publier
            </button>
          </form>
        </div>
      </section>
      <UserFooter />
    </>
  );
}

export default AdminUpdateCGU;
