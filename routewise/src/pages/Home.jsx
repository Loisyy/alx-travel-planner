import Hero from "../components/Hero";
import Search from "../components/Search";
import FlagsStrip from "../components/FlagsStrip";
import TopVisited from "../components/TopVisited";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Hero />
      <div className="py-8 px-8 bg-gray-50">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Where do you want to go?
        </h2>
      </div>
      <Search />
      <FlagsStrip />
      <TopVisited />
      <Footer />
    </div>
  );
}

export default Home;
