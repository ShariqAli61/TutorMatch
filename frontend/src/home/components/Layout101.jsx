"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout101() {
  return (
    <section id="relume" className="bodycolor px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Secure</p>
            <h1 className="text-5xl font-bold leading-[1.2] md:text-7xl lg:text-8xl">
              Empowering Connections Between Students and Tutors
            </h1>
          </div>
          <div>
            <p className="mb-6 md:mb-8 md:text-md">
              Our platform ensures a seamless experience for parents and
              students. Enjoy secure communication and easy scheduling with
              qualified tutors.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo 1"
                  />
                </div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Stay Connected
                </h6>
                <p>
                  Communicate effortlessly with tutors through our secure
                  messaging system.
                </p>
              </div>
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo 1"
                  />
                </div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Easy Scheduling
                </h6>
                <p>
                  Book sessions at your convenience with our intuitive
                  scheduling tool.
                </p>
              </div>
            </div>
            {/* <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button className="amber-button" title="Learn More" variant="secondary">
                Learn More
              </Button>
              <Button
                title="Sign Up"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className=" amber-button"
              >
                Sign Up
              </Button>
            </div> */}
          </div>
        </div>
        <img
          src="src\assets\virtual.jpg"
          className="w-full object-cover"
          alt="Relume placeholder image"
        />
      </div>
    </section>
  );
}
