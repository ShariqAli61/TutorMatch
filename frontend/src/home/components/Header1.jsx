"use client";
import { useNavigate } from "react-router-dom";
import { Button } from "@relume_io/relume-ui";
import React from "react";
import './styles.css'
export function Header1() {
  const navigate = useNavigate();
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 bodycolor" >
      <div className="container ">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Find Your Perfect Tutor with TutorMatch
            </h1>
            <p className="md:text-md">
              TutorMatch connects parents and students with qualified educators
              in Pakistan, making the search for the right tutor easier than
              ever. Explore our platform to discover trusted teachers who can
              help achieve academic success.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {/* <Button title="Sign Up">Sign Up</Button> */}
              <Button className="amber-button px-6 py-2 " title="" size="sm" onClick={() => navigate("/StudentRegistration")}>
                          Sign Up
                        </Button>
              {/* <Button className="amber-button" title="Search" variant="secondary">
                Search
              </Button> */}
            </div>
          </div>
          <div>
            <img
              src="\src\assets\class learning.jpg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
