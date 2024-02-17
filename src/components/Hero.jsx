import Navbar from "./Navbar";
import Right from "../icons/Right";
import { Link } from "react-scroll";

export default function Hero({ user }) {
  return (
    <>
      <div className="relative bg-secondary">
        <div className="container mx-auto p-8 text-white">
          <Navbar user={user} />
          <div className="tagline-font font-bold mt-8 px-8 text-5xl font-bold mb-4 text-black uppercase">
            Fuel <br /> Your Curiosity – <br />
            Find Joy <br />
            in Every Chapter!
          </div>
          <div className="flex flex-col px-8 md:flex-row md:items-center">
            <p className="nav-font uppercase text-black md:mr-8 md:text-xl">
              Curated Tales for Every Mood
            </p>
            <Link to="aboutSection" smooth={true} duration={500}>
              <button
                className="flex gap-2 py-2 bg-accent1 text-black font-bold uppercase px-3 py-2 rounded-full mt-4 md:mt-0"
                style={{ whiteSpace: "nowrap", overflow: "hidden" }}
              >
                Learn More
                <Right />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
