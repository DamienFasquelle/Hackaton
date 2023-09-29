import AdminHeader from "../../components/admin/AdminHeader";
import UserFooter from "../../components/user/UserFooter";
import AdminNotification from "../../components/admin/AdminNotification";
import AdminTop5 from "../../components/admin/AdminTop5";
import { useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate()

  useEffect(() => {

    const jwt = Cookies.get("jwt");

    if (!jwt) {
      navigate("/");
    } else {
      try {
        const user = jwtDecode(jwt);
        if (user.data.id !== 1) {
          navigate("/");
        }
      } catch (error) {
        console.error("Erreur lors du décodage du jeton JWT :", error);
        navigate("/");
      }
    }
  })


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
