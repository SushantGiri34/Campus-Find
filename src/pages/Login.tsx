import { useState } from "react";
import Button from "react-bootstrap/Button";

interface LoginProps {
  onBack: () => void;
  onLoginSuccess: (role: "student" | "admin", username: string) => void;
}

type RoleType = "student" | "admin";
type AuthType = "login" | "register";

type StudentUser = {
  role: "student";
  username: string;
  email: string;
  password: string;
  course: string;
  year: string;
  semester: string;
};

type AdminUser = {
  role: "admin";
  username: string;
  teacherEmail: string;
  password: string;
};

const Login = ({ onBack, onLoginSuccess }: LoginProps) => {
  const [role, setRole] = useState<RoleType>("student");
  const [authType, setAuthType] = useState<AuthType>("login");
  const [message, setMessage] = useState("");

  const [studentForm, setStudentForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    course: "",
    year: "",
    semester: "",
  });

  const [adminForm, setAdminForm] = useState({
    username: "",
    teacherEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setStudentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAdminForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setMessage("");

    const savedStudents: StudentUser[] = JSON.parse(
      localStorage.getItem("campusfind_students") || "[]",
    );

    const savedAdmins: AdminUser[] = JSON.parse(
      localStorage.getItem("campusfind_admins") || "[]",
    );

    if (role === "student" && authType === "register") {
      const {
        username,
        email,
        password,
        confirmPassword,
        course,
        year,
        semester,
      } = studentForm;

      if (
        !username ||
        !email ||
        !password ||
        !confirmPassword ||
        !course ||
        !year ||
        !semester
      ) {
        setMessage("Please fill all student register fields.");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Student passwords do not match.");
        return;
      }

      const alreadyExists = savedStudents.some((user) => user.email === email);

      if (alreadyExists) {
        setMessage("Student already registered with this email.");
        return;
      }

      const newStudent: StudentUser = {
        role: "student",
        username,
        email,
        password,
        course,
        year,
        semester,
      };

      const updatedStudents = [...savedStudents, newStudent];
      localStorage.setItem(
        "campusfind_students",
        JSON.stringify(updatedStudents),
      );

      setMessage("Student registered successfully. Now you can login.");

      setStudentForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        course: "",
        year: "",
        semester: "",
      });

      setAuthType("login");
      return;
    }

    if (role === "admin" && authType === "register") {
      const { username, teacherEmail, password, confirmPassword } = adminForm;

      if (!username || !teacherEmail || !password || !confirmPassword) {
        setMessage("Please fill all admin register fields.");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Admin passwords do not match.");
        return;
      }

      const alreadyExists = savedAdmins.some(
        (admin) => admin.teacherEmail === teacherEmail,
      );

      if (alreadyExists) {
        setMessage("Admin already registered with this teacher email.");
        return;
      }

      const newAdmin: AdminUser = {
        role: "admin",
        username,
        teacherEmail,
        password,
      };

      const updatedAdmins = [...savedAdmins, newAdmin];
      localStorage.setItem("campusfind_admins", JSON.stringify(updatedAdmins));

      setMessage("Admin registered successfully. Now you can login.");

      setAdminForm({
        username: "",
        teacherEmail: "",
        password: "",
        confirmPassword: "",
      });

      setAuthType("login");
      return;
    }

    if (role === "student" && authType === "login") {
      const { email, password } = studentForm;

      if (!email || !password) {
        setMessage("Please enter student email and password.");
        return;
      }

      const matchedStudent = savedStudents.find(
        (user) => user.email === email && user.password === password,
      );

      if (!matchedStudent) {
        setMessage("Invalid student email or password.");
        return;
      }

      localStorage.setItem(
        "campusfind_current_user",
        JSON.stringify({
          role: "student",
          username: matchedStudent.username,
        }),
      );

      onLoginSuccess("student", matchedStudent.username);
      return;
    }

    if (role === "admin" && authType === "login") {
      const { teacherEmail, password } = adminForm;

      if (!teacherEmail || !password) {
        setMessage("Please enter admin teacher email and password.");
        return;
      }

      const matchedAdmin = savedAdmins.find(
        (admin) =>
          admin.teacherEmail === teacherEmail && admin.password === password,
      );

      if (!matchedAdmin) {
        setMessage("Invalid admin teacher email or password.");
        return;
      }

      localStorage.setItem(
        "campusfind_current_user",
        JSON.stringify({
          role: "admin",
          username: matchedAdmin.username,
        }),
      );

      onLoginSuccess("admin", matchedAdmin.username);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "wheat",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.463)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "40px",
          borderRadius: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "left",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px", fontSize: "3em", fontWeight: "900", letterSpacing: "2px", color: "#333"}}>
          {authType === "login" ? "Login" : "Register"}
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#444",
            marginBottom: "30px",
            fontWeight: "600"
          }}
        >
          {role === "student"
            ? authType === "login"
              ? "Login as Student"
              : "Register as Student"
            : authType === "login"
              ? "Login as Admin"
              : "Register as Admin"}
        </p>

        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "12px",
              color: "#333"
            }}
          >
            Choose Action
          </label>

          <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontWeight: "600" }}>
              <input
                type="radio"
                name="authType"
                value="login"
                checked={authType === "login"}
                onChange={() => {
                  setAuthType("login");
                  setMessage("");
                }}
                style={{ marginRight: "10px", width: "18px", height: "18px" }}
              />
              Login
            </label>

            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontWeight: "600" }}>
              <input
                type="radio"
                name="authType"
                value="register"
                checked={authType === "register"}
                onChange={() => {
                  setAuthType("register");
                  setMessage("");
                }}
                style={{ marginRight: "10px", width: "18px", height: "18px" }}
              />
              Register
            </label>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "12px",
              color: "#333"
            }}
          >
            Choose Role
          </label>

          <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontWeight: "600" }}>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={() => {
                  setRole("student");
                  setMessage("");
                }}
                style={{ marginRight: "10px", width: "18px", height: "18px" }}
              />
              Student
            </label>

            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontWeight: "600" }}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => {
                  setRole("admin");
                  setMessage("");
                }}
                style={{ marginRight: "10px", width: "18px", height: "18px" }}
              />
              Admin
            </label>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", marginBottom: "30px" }} />

        {message && (
          <div
            style={{
              backgroundColor: message.includes("success") ? "#d1e7dd" : "#f8d7da",
              color: message.includes("success") ? "#0f5132" : "#842029",
              padding: "12px 15px",
              borderRadius: "12px",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            {message}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {role === "student" ? (
            <>
              {authType === "register" && (
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  value={studentForm.username}
                  onChange={handleStudentChange}
                  style={inputStyle}
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={studentForm.email}
                onChange={handleStudentChange}
                style={inputStyle}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={studentForm.password}
                onChange={handleStudentChange}
                style={inputStyle}
              />
              {authType === "register" && (
                <>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={studentForm.confirmPassword}
                    onChange={handleStudentChange}
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    name="course"
                    placeholder="Course (e.g. B.Tech)"
                    value={studentForm.course}
                    onChange={handleStudentChange}
                    style={inputStyle}
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="text"
                      name="year"
                      placeholder="Year"
                      value={studentForm.year}
                      onChange={handleStudentChange}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <input
                      type="text"
                      name="semester"
                      placeholder="Semester"
                      value={studentForm.semester}
                      onChange={handleStudentChange}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {authType === "register" && (
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  value={adminForm.username}
                  onChange={handleAdminChange}
                  style={inputStyle}
                />
              )}
              <input
                type="email"
                name="teacherEmail"
                placeholder="Teacher Email"
                value={adminForm.teacherEmail}
                onChange={handleAdminChange}
                style={inputStyle}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={adminForm.password}
                onChange={handleAdminChange}
                style={inputStyle}
              />
              {authType === "register" && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={adminForm.confirmPassword}
                  onChange={handleAdminChange}
                  style={inputStyle}
                />
              )}
            </>
          )}

          <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
            <Button
              onClick={handleSubmit}
              style={{
                flex: 2,
                backgroundColor: "#7e7eee",
                border: "none",
                borderRadius: "12px",
                padding: "12px",
                fontWeight: "700",
                fontSize: "1.1em"
              }}
            >
              {authType === "login" ? "Login" : "Register"}
            </Button>
            <Button
              variant="outline-secondary"
              onClick={onBack}
              style={{
                flex: 1,
                borderRadius: "12px",
                padding: "12px",
                fontWeight: "700",
                backgroundColor: "white",
                border: "1px solid #ddd",
                color: "#333"
              }}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "12px",
  border: "1px solid rgba(0,0,0,0.1)",
  fontSize: "16px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  outline: "none",
  transition: "border-color 0.3s",
};

export default Login;