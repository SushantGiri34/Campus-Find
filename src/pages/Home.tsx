import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import "./Home.css";

interface HomeProps {
  onOpenLogin: () => void;
}

const Home = ({ onOpenLogin }: HomeProps) => {
  return (
    <div className="home-page">
      <Navbar onLetsStart={onOpenLogin} />
      <HeroSection
        onClickLost={onOpenLogin}
        onClickFound={onOpenLogin}
      />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;