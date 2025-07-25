"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout239() {
  return (
    <section id="relume" className="bodycolor px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full ">
              <p className="mb-3 font-semibold md:mb-4"></p>
              <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Discover Your Ideal Tutor Effortlessly
              </h1>
              <p className="md:text-md">
                Our advanced search and filtering system allows you to find the
                perfect tutor tailored to your needs. Easily filter by subject
                expertise, location, and availability to streamline your search.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                />
              </div>
              <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Filter by Subject for Targeted Learning
              </h2>
              <p>
                Narrow down your options to find specialists in the subjects
                that matter most to you.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                />
              </div>
              <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Location-Based Searches for Convenience
              </h2>
              <p>Locate tutors nearby to facilitate easy in-person sessions.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                />
              </div>
              <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Availability Filters to Match Your Schedule
              </h2>
              <p>Find tutors who are available when you need them.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            <Button className="amber-button" variant="secondary">Learn More</Button>
            <Button className="cursor-pointer" iconRight={<RxChevronRight />} variant="link" size="link">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
