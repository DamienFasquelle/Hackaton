import { Link } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import UserFooter from "../../components/user/UserFooter";
import AdminNotification from "../../components/admin/AdminNotification";
import AdminTop5 from "../../components/admin/AdminTop5";
import AdminShowPhotos from "../../components/admin/AdminShowPhotos";

function AdminDashboard() {
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
