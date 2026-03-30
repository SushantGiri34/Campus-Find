import "./HeroSection.css";

interface HeroSectionProps {
  onClickLost: () => void;
  onClickFound: () => void;
}

const HeroSection = ({
  onClickLost,
  onClickFound,
}: HeroSectionProps) => {
  return (
    <div className="hero" id="home">
      <div className="left">
        <h1>Lost it? We’ll Help You Find it</h1>
        <br />
        <p className="p1">
          Campus-Find: The smarter way to recover your essentials.
        </p>
        <p className="p2">
          No more scrolling through endless chat groups. Report lost items or
          browse found treasures in a centralized, secure database designed
          exclusively for your campus.
        </p>

        <div className="cta-btns">
          <button className="info1" onClick={onClickFound}>
            <i className="ri-search-line"></i> Find Item
          </button>

          <button className="info2" onClick={onClickLost}>
            Report Lost
          </button>
        </div>
      </div>

      <div className="right">
        <img
          src="https://imgs.search.brave.com/JCZwLp6P2W6xTSzirByxwulQV9_WEfXRRhvg35OR8b0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvSWxs/dXN0cmF0aW9uLVBO/Ry1JbWFnZXMtSEQu/cG5n"
          alt="Illustration"
        />
      </div>
    </div>
  );
};

export default HeroSection;