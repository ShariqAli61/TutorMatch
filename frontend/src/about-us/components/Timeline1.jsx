"use client";

import { Button } from "@relume_io/relume-ui";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { RxChevronRight } from "react-icons/rx";

const Circle = () => {
  const circleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: circleRef,
    offset: ["end end", "end center"],
  });
  const backgroundColor = {
    backgroundColor: useTransform(scrollYProgress, [0.85, 1], ["#ccc", "#000"]),
  };
  return (
    <div className="absolute flex h-full w-8 items-start justify-center md:-ml-24 md:w-24 lg:-ml-32 lg:w-32">
      <motion.div
        ref={circleRef}
        style={backgroundColor}
        className="z-20 mt-7 size-4 rounded-full shadow-[0_0_0_8px_#fff] md:mt-8"
      />
    </div>
  );
};

export function Timeline1() {
  return (
    <section id="relume" className="bodycolor px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="relative grid auto-cols-fr grid-cols-1 items-start justify-center gap-6 sm:gap-12 md:grid-cols-2 md:gap-24 lg:gap-32">
          <div className="relative top-0 z-10 md:sticky md:top-20 md:z-auto md:pr-4">
            <p className="mb-3 font-semibold md:mb-4">Journey</p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Our Milestones: A Timeline of Progress
            </h1>
            <p className="md:text-md">
              TutorMatch has evolved significantly since its inception. Each
              milestone marks our commitment to connecting educators and
              families.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button className="amber-button" title="Learn More" variant="secondary">
                Learn More
              </Button>
              <Button
                title="Explore"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Explore
              </Button>
            </div>
          </div>
          <div className="absolute z-0 flex h-full w-8 flex-col items-center justify-self-start [grid-area:2/1/3/2] md:z-auto md:justify-self-center md:[grid-area:auto]">
            <div className="absolute z-10 h-16 w-1 bg-gradient-to-b from-background-primary to-transparent" />
            <div className="sticky top-0 mt-[-50vh] h-[50vh] w-[3px] bg-neutral-black" />
            <div className="h-full w-[3px] bg-neutral-lighter" />
            <div className="absolute bottom-0 z-0 h-16 w-1 bg-gradient-to-b from-transparent to-background-primary" />
            <div className="absolute top-[-50vh] h-[50vh] w-full bg-background-primary" />
          </div>
          <div className="grid auto-cols-fr gap-x-12 gap-y-8 sm:gap-y-12 md:gap-x-20 md:gap-y-20">
            <div className="relative">
              <Circle />
              <div className="ml-12 mt-4 flex flex-col md:ml-0">
                <h2 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                  2021
                </h2>
                <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                  Launch of Platform
                </h3>
                <p>
                  In 2021, we launched TutorMatch, revolutionizing the way
                  parents find tutors. Our platform was designed with user
                  experience in mind.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  <Button className="amber-button" title="Next" variant="secondary">
                    Next
                  </Button>
                  <Button
                    title="Details"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <Circle />
              <div className="ml-12 mt-4 flex flex-col md:ml-0">
                <h2 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                  2022
                </h2>
                <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                  User Feedback Integration
                </h3>
                <p>
                  In 2022, we integrated user feedback to enhance our features.
                  This allowed us to better serve the needs of our community.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  <Button className="amber-button" title="Next" variant="secondary">
                    Next
                  </Button>
                  <Button
                    title="Updates"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    Updates
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <Circle />
              <div className="ml-12 mt-4 flex flex-col md:ml-0">
                <h2 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                  2023
                </h2>
                <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                  Expansion of Services
                </h3>
                <p>
                  In 2023, we expanded our services to include more educational
                  resources. Our mission is to continue enhancing learning
                  opportunities for students.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  <Button className="amber-button" title="Next" variant="secondary">
                    Next
                  </Button>
                  <Button
                    title="Explore"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <Circle />
              <div className="ml-12 mt-4 flex flex-col md:ml-0">
                <h2 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                  Future
                </h2>
                <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                  Innovative Learning Solutions
                </h3>
                <p>
                  Looking ahead, we aim to introduce innovative learning
                  solutions. Our focus remains on connecting students with the
                  best educators.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  <Button className="amber-button" title="Join" variant="secondary">
                    Join
                  </Button>
                  <Button
                    title="Connect"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
