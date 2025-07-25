"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq2() {
  return (
    <section id="relume" className="bodycolor px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h1>
          <p className="md:text-md">
            Here are some common questions about finding and hiring tutors
            through TutorMatch.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do I find tutors?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              To find tutors, simply use our search feature. You can filter by
              subject, location, and availability. Browse through the profiles
              to choose the best fit for your needs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Are the tutors qualified?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, all tutors on TutorMatch undergo a thorough vetting process.
              We verify their qualifications and experience to ensure you
              receive quality education. You can view their credentials on their
              profiles.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do payments work?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Payments are securely processed through our platform. You can pay
              directly after each session or choose a package. All transactions
              are protected for your peace of mind.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              Can I leave reviews?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Absolutely! After each session, you can leave a review for your
              tutor. This helps other parents make informed decisions. Your
              feedback is invaluable to our community.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              What if I have issues?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              If you encounter any issues, please reach out to our support team.
              We are here to assist you with any concerns. Your satisfaction is
              our priority.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">We're here to help you!</p>
          <div className="mt-6 md:mt-8">
            <Button className="amber-button" title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
