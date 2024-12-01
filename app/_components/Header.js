"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Indicator, Avatar, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Profile from "./Profile";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const loginedIn = true;
  const showDownRef = useRef();

  useEffect(() => {
    const handleClickOutOutside = (e) => {
      if (showDownRef.current && !showDownRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutOutside);
    };
  }, [showDownRef, setIsMenuOpen]);

  return (
    <>
      <header className="flex items-center justify-between h-16 px-6 bg-white shadow-md lg:px-10">
        <Link href="/">
          <h1 className="text-2xl font-semibold cursor-pointer">Ticketist</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex-row items-center hidden gap-8 text-sm lg:flex">
          <ul className="flex gap-8">
            <Link href={"/myTickets"}>
              <li className="cursor-pointer hover:text-[#32BC9B]">
                My Tickets
              </li>
            </Link>
            <li className="cursor-pointer hover:text-[#32BC9B]">Help</li>
          </ul>
          {loginedIn ? (
            <Menu trigger="hover" shadow="md" width={150}>
              <Menu.Target>
                <div className="cursor-pointer">
                  <Indicator color="#32BC9B">
                    <Avatar variant="default" radius="sm" src="" />
                  </Indicator>
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<CgProfile width={14} height={14} />}
                  onClick={open}
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  leftSection={<RiLogoutBoxLine width={14} height={14} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link href="/login">
              <button
                className="w-full py-2 px-6 text-white bg-[#32BC9B] font-semibold rounded-3xl shadow-md hover:bg-[#28a083] transition-all duration-300 ease-in-out"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Access
              </button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="absolute top-0 left-0 z-10 w-full px-6 py-8 bg-white rounded-lg shadow-lg"
            ref={showDownRef}
          >
            <ul className="flex flex-col items-center gap-8 text-lg font-semibold text-gray-700">
              {/*My Tickets Item */}
              <Link href={"/myTickets"}>
                <li
                  className="cursor-pointer hover:text-[#32BC9B] transition-all duration-300 ease-in-out w-full text-center py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Tickets
                </li>
              </Link>

              {/* Help Item */}
              <li
                className="cursor-pointer hover:text-[#32BC9B] transition-all duration-300 ease-in-out w-full text-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </li>

              {/* Conditional Menu: User Profile or Sign-in Button */}
              {loginedIn ? (
                <div className="flex items-center justify-center w-full gap-6">
                  {/* User Avatar with Indicator */}
                  <div className="cursor-pointer" onClick={open}>
                    <Avatar
                      variant="default"
                      radius="xl"
                      src=""
                      alt="User Avatar"
                      size="lg"
                    />
                  </div>

                  {/* Logout Icon */}
                  <RiLogoutBoxLine
                    size={30}
                    className="cursor-pointer hover:text-[#32BC9B] transition-all duration-300 ease-in-out"
                  />
                </div>
              ) : (
                <Link href="/login">
                  <button
                    className="w-full py-2 px-6 text-white bg-[#32BC9B] font-semibold rounded-3xl shadow-md hover:bg-[#28a083] transition-all duration-300 ease-in-out"
                    onClick={() => {}}
                  >
                    Access
                  </button>
                </Link>
              )}
            </ul>
          </div>
        )}
      </header>

      <Profile opened={opened} close={close} />
    </>
  );
}

export default Header;
