import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import UserFooter from "../../components/user/UserFooter";
import AdminNotification from "../../components/admin/AdminNotification";
import AdminTop5 from "../../components/admin/AdminTop5";
import AdminShowPhotos from "../../components/admin/AdminShowPhotos";
import { useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

function AdminDashboard() {
  const navigate = useNavigate();

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
  }, []);
  return (
    <>
      <AdminHeader />
      <div main className="dashboard-main">
        <section className="notification-section main-container">
          <AdminNotification />
        </section>
        <section className="top5-section main-container">
          <AdminTop5 />
        </section>
        {/* <section className="photos-section">
        <AdminShowPhotos />
      </section> */}
      </div>
      <UserFooter />
    </>
  );
}

export default AdminDashboard;
