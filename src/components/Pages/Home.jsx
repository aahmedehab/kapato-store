import Hero from "../Hero";
import FeaturedCollection from "../FeaturedCollection";
import SummerMoments from "../SummerMoments";
import InstagramFeed from "../InstagramFeed";

function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <main>
        <FeaturedCollection />

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <SummerMoments />
            <InstagramFeed />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;