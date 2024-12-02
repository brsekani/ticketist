import { IoIosArrowRoundForward } from "react-icons/io";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#141414] text-[#EFEFEF] px-10 py-8 w-full">
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
        {/* Left Section */}
        <div className="lg:w-[30%] flex flex-col gap-5">
          <h3 className="text-xl font-semibold">Stay in touch with us</h3>

          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for events"
              className="w-full p-3 text-gray-800 bg-white rounded-full shadow-md focus:outline-none"
            />
            <button className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#32BC9B] hover:bg-[#28a083] transition-colors">
              <IoIosArrowRoundForward className="text-white" />
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <TiSocialFacebook color="black" size={20} />
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <FaInstagram color="black" size={20} />
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap gap-10 text-sm">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">About us</h3>
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer hover:text-[#32BC9B]">About</li>
              <li className="cursor-pointer hover:text-[#32BC9B]">Press</li>
              <li className="cursor-pointer hover:text-[#32BC9B]">Media kit</li>
              <li className="cursor-pointer hover:text-[#32BC9B]">Careers</li>
              <li className="cursor-pointer hover:text-[#32BC9B]">News</li>
              <li className="cursor-pointer hover:text-[#32BC9B]">Support</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Follow us</h3>
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer hover:text-[#32BC9B]">Facebook</li>
              <li className="cursor-pointer hover:text-[#32BC9B]">Twitter</li>
              <li className="cursor-pointer hover:text-[#32BC9B]">LinkedIn</li>
              <li className="cursor-pointer hover:text-[#32BC9B]">Instagram</li>
              <li className="cursor-pointer hover:text-[#32BC9B]">Snapchat</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">For organizers</h3>
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer hover:text-[#32BC9B]">
                Partnership
              </li>
              <li className="cursor-pointer hover:text-[#32BC9B]">
                Collaboration
              </li>
              <li className="cursor-pointer hover:text-[#32BC9B]">
                List an event
              </li>
              <li className="cursor-pointer hover:text-[#32BC9B]">
                For businesses
              </li>
              <li className="cursor-pointer hover:text-[#32BC9B]">
                Business Support
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10">
        <hr className="border-[#515151]" />
        <h1 className="mt-5 text-2xl font-semibold text-center cursor-pointer lg:text-left">
          Ticketist
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
