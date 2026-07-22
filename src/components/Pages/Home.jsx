import Hero from "../Home components/Hero";
import FeaturedCollection from "../Home components/FeaturedCollection";
import SummerMoments from "../Home components/SummerMoments";
import InstagramFeed from "../Home components/InstagramFeed";
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
        {/* <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <SummerMoments />
            <InstagramFeed />
          </div>
        </div> */}
      </main>
    </div>
  );
}

export default Home;