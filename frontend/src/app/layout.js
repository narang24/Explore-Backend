import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
});

export const metadata = {
  title: "Xplore",
  description: "A Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
