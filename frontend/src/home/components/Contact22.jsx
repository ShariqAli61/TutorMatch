"use client";

import React from "react";
import { BiEnvelope, BiMap, BiMessageDetail, BiPhone } from "react-icons/bi";

export function Contact22() {
  return (
    <section id="relume" className="bodycolor px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid auto-cols-fr gap-x-8 gap-y-12 sm:gap-x-10 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
          <div>
            <div className="flex mb-5 sm:mb-6">
              <BiEnvelope className="size-12" />
            
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Email
            </h3></div>
            <p className="mb-5 md:mb-6">
              Reach out to us for any inquiries or support.
            </p>
            <a className="underline" href="#">
              hello@tutormatch.pk
            </a>
          </div>
          <div>
            <div className="flex mb-5 sm:mb-6">
              <BiMessageDetail className="flex size-12" />
            
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Live chat
            </h3></div>
            <p className="mb-5 md:mb-6">
              Chat with us for immediate assistance and guidance.
            </p>
            {/* <a className="underline" href="#">
              Start new chat
            </a> */}
          </div>
          <div>
            <div className="flex mb-5 sm:mb-6">
              <BiPhone className="size-12" />
            
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Phone
            </h3></div>
            <p className="mb-5 md:mb-6">
              Call us for personalized support and inquiries.
            </p>
            <a className="underline" href="#">
              +92 (21) 123-4567
            </a>
          </div>
          <div>
            <div className="flex mb-5 sm:mb-6">
              <BiMap className="size-12" />
            
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Office
            </h3>
            </div>
            <p className="mb-5 md:mb-6">
              Visit us for in-person consultations and support.
            </p>
            <a className="underline" href="#">
              456 Tutor Lane, Karachi, PK 74000
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
