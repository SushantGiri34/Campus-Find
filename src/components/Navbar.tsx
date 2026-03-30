import "./Navbar.css";

interface NavbarProps {
  onLetsStart: () => void;
  onLogout?: () => void;
  isDashboard?: boolean;
}

const Navbar = ({ onLetsStart, onLogout, isDashboard }: NavbarProps) => {
  return (
    <div className="nav">
      <div className="main">
        <div className="logo">
          <a href={isDashboard ? "#dashboard" : "#home"}>
            <i className="ri-school-line"></i>
            <span style={{ marginLeft: "10px", fontWeight: "900", letterSpacing: "1px" }}>CampusFind</span>
          </a>
        </div>

        {!isDashboard && (
          <div className="tag">
            <a href="#about">About us</a>
            <a href="#help">Help</a>
            <a href="#privacy">Privacy</a>
          </div>
        )}

        <div className="login">
          {isDashboard ? (
            <button className="btn1 logout-btn" onClick={onLogout}>
              Logout <i className="ri-logout-box-r-line"></i>
            </button>
          ) : (
            <button className="btn1" onClick={onLetsStart}>
              Let's Start <i className="ri-arrow-right-up-line"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;