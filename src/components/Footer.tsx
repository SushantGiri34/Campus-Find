import "./Footer.css";

const Footer = () => {
  return (
    <footer id="help">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Campus-Find</h4>
          <p>
            Simplifying campus life by reconnecting students with their lost
            essentials through community trust.
          </p>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <a href="#home">Home</a>
          <a href="#about">About Project</a>
          <a href="#home">Report Lost Item</a>
          <a href="#home">Found Something?</a>
        </div>

        <div className="footer-section" id="privacy">
          <h4>Support & Socials</h4>
          <p>Email: contact@campusfind.edu</p>
          <div className="social-icons">
            <i className="ri-instagram-line"></i>
            <i className="ri-twitter-x-line"></i>
            <i className="ri-github-line"></i>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2026 Campus-Find Portal | Built for Hackathon
      </div>
    </footer>
  );
};

export default Footer;