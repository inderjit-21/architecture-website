import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalCanvas from "@/components/common/GlobalCanvas";
import { AppProvider } from "@/context/AppContext";
import SmoothScroll from "@/components/common/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Architecture Website",
  description: "Made By Inderjit Singh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <SmoothScroll>
          <AppProvider>
            <GlobalCanvas />
            {children}
          </AppProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
