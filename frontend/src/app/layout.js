import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ["latin"], variable: '--font-primary' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-secondary' });

export const metadata = {
  title: "The Hamper",
  description: "Luxury gifting and bespoke hampers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
