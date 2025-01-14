import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Script from "next/script";

import { AdminProvider } from "@/context/admincontext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Eventop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
      <AdminProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-gray-900 flex flex-col justify-between h-screen w-screen`}
        >
          <NavBar />
          {children}
          <Footer />
          <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></Script>
            <df-messenger
              intent="WELCOME"
              chat-title="Eventop"
              agent-id="e58e2f28-b4d2-468c-b436-7d5ac5896bf9"
              language-code="es"
              className="bg-gray-900"
            ></df-messenger>
          
        </body>
        </AdminProvider>
      </UserProvider>
    </html>
  );
}
