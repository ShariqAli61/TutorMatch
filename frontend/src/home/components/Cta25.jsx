"use client";
import { useNavigate } from "react-router-dom";
import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta25() {
  const navigate = useNavigate();
  return (
    <section id="relume" className="bodycolor px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container text-center">
        <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
          Find Your Perfect Tutor Today
        </h1>
        <p className="md:text-md">
          Join our community and connect with qualified tutors to enhance your
          learning experience.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
          <Button className="amber-button"  onClick={() => navigate("/StudentRegistration")} title="Sign Up">Sign Up</Button>
          {/* <Button className="amber-button" title="Learn More" variant="secondary">
            Learn More
          </Button> */}
        </div>
      </div>
    </section>
  );
}
