import React from "react";
import { Navbar2 } from "../home/components/Navbar2";
import { Header49 } from "./components/Header49";
import { Layout1 } from "./components/Layout1";
import { Layout89 } from "./components/Layout89";
import { Timeline1 } from "./components/Timeline1";
// import { Testimonial16 } from "./components/Testimonial16";
import { Cta1 } from "./components/Cta1";
import { Footer2 } from "./components/Footer2";

export default function AboutPage() {
  return (
    <div>
      <Navbar2 />
      <Header49 />
      <Layout1 />
      <Layout89 />
      <Timeline1 />
      {/* <Testimonial16 /> */}
      <Cta1 />
      <Footer2 />
    </div>
  );
}
