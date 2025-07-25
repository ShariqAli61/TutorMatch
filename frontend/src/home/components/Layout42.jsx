"use client";

import React from "react";

export function Layout42() {
  return (
    <section id="relume" className="bodycolor px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start justify-between gap-5 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20">
          <div>
            <h3 className="text-4xl font-bold leading-[1.2] md:text-5xl lg:text-6xl">
              Connecting students with qualified educators for a brighter
              educational future.
            </h3>
          </div>
          <div>
            <p className="md:text-md">
              At TutorMatch, our mission is to empower students by providing
              seamless access to qualified educators. We envision a world where
              every learner can find the right tutor to unlock their full
              potential. With a focus on transparency and trust, we simplify the
              hiring process for parents and students alike.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
