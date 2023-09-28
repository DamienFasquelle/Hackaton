import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import { useEffect, useState } from "react";
import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

function CGU() {
  const [CGU, setCGU] = useState(EditorState.createEmpty());

  const fetchCGU = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/CGU`);
      const responseJs = await response.json();
      const contentState = convertFromRaw(JSON.parse(responseJs.data.text));
      const editorState = EditorState.createWithContent(contentState);
      setCGU(editorState);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des CGU :",
        error
      );
    }
  };

  useEffect(() => {
    fetchCGU();
  }, []);

  const contentState = CGU.getCurrentContent();
  const html = stateToHTML(contentState);

  return (
    <>
      <Header />
      <section className="CGU">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
      <Footer />
    </>
  );
}

export default CGU;
