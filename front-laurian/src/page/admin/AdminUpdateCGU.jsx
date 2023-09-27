import AdminHeader from "../../components/admin/AdminHeader";
import Footer from "../../components/public/Footer";

function AdminUpdateCGU() {

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const message = event.target.text.value;

    const messageText = {
      text: message,
    };

    fetch("http://localhost:3000/api/CGU", {
      method: "POST",
      body: JSON.stringify(messageText),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
  }
  return (
    <>
      <AdminHeader />
      <section>
        <div className="div">
          <form onSubmit={handleSubmitForm}>
            <label htmlFor="text">message</label> <br />
            <textarea id="text" rows="10" /> <br />
            <button type="submit">Publier</button>
          </form>
        </div>

      </section>
      <Footer />
    </>
  )
}

export default AdminUpdateCGU;
