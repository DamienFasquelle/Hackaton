import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./page/public/Homepage";
import CGU from "./page/public/Cgu";
import Login from "./page/public/Login";
import Signup from "./page/public/Signup";
import AdminDashboard from "./page/admin/AdminDashBoard";
import UserUpload from "./page/user/UserUpload";
import UserUpdate from "./page/user/UserUpdate";
import UserPhotos from "./page/user/UserPhotos";
import AdminUpdateCGU from "./page/admin/AdminUpdateCGU";
import AdminValidatePhoto from "./page/admin/AdminValidate";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Homepage />} />
        <Route path="/conditions-generales" element={<CGU />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Signup />} />
        {/* ADMIN */}
        <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/admin-validate" element={<AdminValidatePhoto />} />
        <Route path="/admin/admin-updatecgu" element={<AdminUpdateCGU />} />
        {/* USER */}
        <Route path="/user/user-upload" element={<UserUpload />} />
        <Route path="/user/user-photos" element={<UserPhotos />} />
        <Route path="/user/user-update" element={<UserUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
