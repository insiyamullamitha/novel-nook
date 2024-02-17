import Hero from "../components/Hero";
import TagLineStrip from "../components/TagLineStrip";
import HomeBooksMenu from "../components/HomeBooksMenu";
import Footer from "../components/Footer";
import About from "../components/About";
import FAQs from "../components/FAQs";

export default function Home({ user }) {
  return (
    <>
      <Hero user={user} />
      <TagLineStrip />
      <HomeBooksMenu />
      <About />
      <FAQs />
      <Footer />
    </>
  );
}
