import { MantineProvider } from "@mantine/core";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import HeaderWrapper from "./_components/HeaderWrapper";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const poppins = Poppins({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Ticketist",
  description: "Buy tickets for events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${poppins.className}  antialiased flex flex-col min-h-screen`}
      >
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Notifications position="top-right" />
          <HeaderWrapper />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </MantineProvider>
      </body>
    </html>
  );
}
