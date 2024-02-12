import Navbar from "./Navbar";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <>
      <div className="relative bg-secondary">
        <div className="container mx-auto p-8 text-white">
          <Navbar className="mt-4" />
          <div className="tagline-font font-bold mt-8 px-8 text-5xl font-bold mb-4 text-black uppercase">
            Fuel <br /> Your Curiosity – <br />
            Find Joy <br />
            in Every Chapter!
          </div>
          <div className="flex items-center">
            <p className="nav-font uppercase text-black px-8 text-xl">
              Curated Tales for Every Mood
            </p>
            <button
              className="flex gap-2 py-2 bg-accent1 text-black font-semibold uppercase px-3 py-2 rounded-full "
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              Learn More
              <Right />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
