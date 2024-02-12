import Hero from "../components/Hero";
import TagLineStrip from "../components/TagLineStrip";
import HomeBooksMenu from "../components/HomeBooksMenu";
import Footer from "../components/Footer";
import About from "../components/About";

export default function Home() {
  return (
    <>
      <Hero />
      <TagLineStrip />
      <HomeBooksMenu />
      <About />
      <Footer />
    </>
  );
}
