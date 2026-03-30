import "./AboutSection.css";

const AboutSection = () => {
  return (
    <div className="about" id="about">
      <div className="png">
        <img
          src="https://imgs.search.brave.com/p7OJpNgmsQaUPURP2wKVMv6XXHvpZhRpQRy0JFi2rZg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL2ZyZWUvdGh1/bWIvZnJlZS1hYm91/dC11cy1pbGx1c3Ry/YXRpb24tc3ZnLWRv/d25sb2FkLXBuZy0x/NzQwMDE5LnBuZw"
          alt="About Us"
        />
      </div>

      <div className="bio">
        <h1>How It Works</h1>
        <h3>Your bridge between lost and found.</h3>
        <p>
          <span>1. Report with Ease</span>
          Post lost items or found belongings with photos and location tags in
          under 30 seconds.
        </p>
        <p>
          <span>2. Secure Verification</span>
          Proof of ownership ensures that every item goes back to its rightful
          owner safely.
        </p>
        <p>
          <span>3. Quick Recovery</span>
          Our organized dashboard lets you filter by category, making discovery
          faster than ever.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;