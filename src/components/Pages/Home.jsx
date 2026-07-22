import Hero from "../Home components/Hero";
import FeaturedCollection from "../Home components/FeaturedCollection";
import ScrollingBanner from "../Home components/ScrollingBanner";
import MadeToGoAnywhere from "../Home components/MadeToGoAnywhere";
import AboutSection from "../Home components/AboutSection";

function Home() {
  return (
    <div className="overflow-x-hidden">
      <main>
      <Hero />
      <ScrollingBanner />
        <FeaturedCollection />
        <MadeToGoAnywhere />
        <AboutSection />

      </main>
    </div>
  );
}

export default Home;