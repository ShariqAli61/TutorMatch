"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta27() {
  return (
    <section id="relume" className="bodycolor  px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10 max-w-lg text-center">
        <h2 className="rb-5 mb-5 text-5xl font-bold text-text-alternative md:mb-6 md:text-7xl lg:text-8xl">
          We're Here to Help You
        </h2>
        <p className="text-text-alternative md:text-md">
          Have questions or ready to start? Contact us today and let’s connect
          you with the right tutor!
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
          <Button className="amber-button" title="Inquire">Inquire</Button>
          <Button className="amber-button" title="Get Started" variant="secondary-alt">
            Get Started
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          className="size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
