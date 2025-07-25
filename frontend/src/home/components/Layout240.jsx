"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout240() {
  return (
    <section id="relume" className=" px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mx-auto mb-12 w-full  text-center md:mb-18 lg:mb-20">
          <h1 className="text-4xl font-bold leading-[1.2] md:text-5xl lg:text-6xl">
            Effortlessly Find the Perfect Tutor for Your Child's Needs
          </h1>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div className="flex w-full flex-col items-center text-center">
            <div className="rb-6 mb-6 md:mb-8">
              <img
                src="src\assets\Gemini_Generated_Image_f2itujf2itujf2it.png"
                alt="Relume placeholder image"
              />
            </div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Experience Trust and Transparency in Every Tutor Connection
            </h2>
            <p>
              Our platform simplifies the search for qualified tutors, making
              education accessible.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {/* <Button className="cursor-pointer amber-button amber-button:hover" iconRight={<RxChevronRight />} variant="link" size="link">
                Learn More
              </Button> */}
            </div>
          </div>
          <div className="flex w-full flex-col items-center text-center">
            <div className="rb-6 mb-6 md:mb-8">
              <img
                src="src\assets\Gemini_Generated_Image_solfizsolfizsolf.png"
                alt="Relume placeholder image"
              />
            </div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Connect with Educators Who Truly Care About Your Child's Success
            </h2>
            <p>
              We foster connections between parents, students, and dedicated
              educators for better learning.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {/* <Button className="cursor-pointer amber-button amber-button:hover" iconRight={<RxChevronRight />} variant="link" size="link">
                Sign Up
              </Button> */}
            </div>
          </div>
          <div className="flex w-full flex-col items-center text-center">
            <div className="rb-6 mb-6 md:mb-8">
              <img
                src="src\assets\ChatGPT Image Jun 29, 2025, 02_12_54 AM.png"
                alt="Relume placeholder image"
              />
            </div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Transparent Reviews and Ratings for Informed Tutor Choices
            </h2>
            <p>
              Read authentic reviews and ratings to choose the best tutor for
              your child.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {/* <Button className="cursor-pointer amber-button amber-button:hover" iconRight={<RxChevronRight />} variant="link" size="link">
                Explore
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
