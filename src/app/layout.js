import { Manrope } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/shared/ThemeProvider";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

const ManropeFont = Manrope({
  subsets: ["latin"],
});

export const metadata = {
  title: "TutorCue",
  description: "Quality guidance for every learner",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={`${ManropeFont.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <NavBar></NavBar>
          {children}
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
