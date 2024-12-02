import Image from "next/image";
import { CiSearch } from "react-icons/ci"; // Make sure this is the correct path for your icon
import concertImage from "../../public/concertImage8.jpg";
import EventSearch from "./EventSearch";

function Hero() {
  return (
    <div className="relative w-full h-[80vh]">
      {/* Hero Background Image */}
      <Image
        className="object-cover object-center"
        src={concertImage}
        alt="Concert Image"
        layout="fill"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,[base64-string]" // Blurred placeholder data
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center text-white bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl sm:w-2/4">
          Dive Into <span className="text-[#32BC9B]">Moments</span> That Last a
          Lifetime
        </h1>
        {/* <div className="relative w-full mt-4 sm:w-2/4">
          <input
            type="text"
            placeholder="Search for events"
            className="w-full p-3 text-gray-800 bg-white rounded-full shadow-md focus:outline-none"
          />
          <button className="absolute top-1 right-2 flex items-center justify-center w-10 h-10 rounded-full bg-[#32BC9B] hover:bg-[#28a083] transition-colors">
            <CiSearch className="text-white" />
          </button>
        </div> */}

        <EventSearch />
        <p className="max-w-md text-lg font-medium">
          Score tickets to exclusive gigs, parties, and festivals—all at
          <span className="text-[#32BC9B]"> unbeatable prices.</span>
        </p>
      </div>
    </div>
  );
}

export default Hero;
