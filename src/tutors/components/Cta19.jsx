"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta19() {
  return (
    <section id="relume" className="bodycolor relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="w-full "> {/* max-w-lg */}
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Connect with Top Tutors Today
          </h2>
          <p className="md:text-md">
            Create your account now to easily reach out to qualified tutors in
            your area.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
            <Button className="amber-button" title="Sign Up">Sign Up</Button>
            <Button className="amber-button" title="Learn More" variant="secondary">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
