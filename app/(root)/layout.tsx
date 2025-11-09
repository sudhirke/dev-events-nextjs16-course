import React from "react";
import LightRays from "@/components/LightRays";

import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Schibsted_Grotesk,
  Martian_Mono,
} from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developer Events",
  description:
    "Events for developers around the world,  you dont want to miss those!",
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} antialiased min-h-screen`}
      >
        <Navbar></Navbar>
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={0.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.4}
            noiseAmount={0.0}
            distortion={0.01}
          />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default layout;
