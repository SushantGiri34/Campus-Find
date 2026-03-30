import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

type PageType = "home" | "login" | "studentDashboard" | "adminDashboard";
type RoleType = "student" | "admin" | null;

const App = () => {
  const [page, setPage] = useState<PageType>("home");
  const [currentRole, setCurrentRole] = useState<RoleType>(null);
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const savedCurrentUser = localStorage.getItem("campusfind_current_user");

    if (savedCurrentUser) {
      const parsedUser = JSON.parse(savedCurrentUser);

      setCurrentRole(parsedUser.role);
      setCurrentUsername(parsedUser.username);

      if (parsedUser.role === "student") {
        setPage("studentDashboard");
      } else if (parsedUser.role === "admin") {
        setPage("adminDashboard");
      }
    }
  }, []);

  const handleLoginSuccess = (
    role: "student" | "admin",
    username: string,
  ) => {
    setCurrentRole(role);
    setCurrentUsername(username);

    if (role === "student") {
      setPage("studentDashboard");
    } else {
      setPage("adminDashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("campusfind_current_user");
    setCurrentRole(null);
    setCurrentUsername("");
    setPage("home");
  };

  return (
    <div
      className="mainDiv"
      style={{
        textAlign: "center",
        minHeight: "100vh",
        height: "auto",
      }}
    >
      {page === "home" && <Home onOpenLogin={() => setPage("login")} />}

      {page === "login" && (
        <Login
          onBack={() => setPage("home")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {page === "studentDashboard" && currentRole === "student" && (
        <StudentDashboard
          username={currentUsername}
          onLogout={handleLogout}
        />
      )}

      {page === "adminDashboard" && currentRole === "admin" && (
        <AdminDashboard
          username={currentUsername}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default App;