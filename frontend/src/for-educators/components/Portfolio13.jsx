"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { useEffect, useState } from "react";
import axios from "axios";




export function Portfolio13() {
  const [students, setStudents] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const visiblestudents = showAll ? students : students.slice(0, 4); // 2 rows = 2 × 4 = 8 cards

  useEffect(() => {
    axios.get("http://localhost:5000/api/students") // Use your backend URL
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);
  return (
    <section id="relume" className="bodycolor px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12  text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Opportunities</p>
          <h2 className="mb-5 text-5xl  font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Available Students for You
          </h2>
          <p className="md:text-md">
            Explore students looking for tutoring assistance.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {/* <article className="border border-border-primary">
            <div>
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                <a href="#">Math Tutor</a>
              </h3>
              <p>Grade 10 Mathematics, Lahore</p>
              <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Math Help
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Lahore Student
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Grade 10
                  </a>
                </li>
              </ul>
              <Button
                title="View project"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 md:mt-6"
              >
                <a href="#">View project</a>
              </Button>
            </div>
          </article>
          <article className="border border-border-primary">
            <div>
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                <a href="#">English Tutor</a>
              </h3>
              <p>Grade 8 English, Karachi</p>
              <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    English Help
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Karachi Student
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Grade 8
                  </a>
                </li>
              </ul>
              <Button
                title="View project"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 md:mt-6"
              >
                <a href="#">View project</a>
              </Button>
            </div>
          </article>

          <article className="border border-border-primary">
            <div>
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                <a href="#">Science Tutor</a>
              </h3>
              <p>Grade 9 Science, Islamabad</p>
              <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Science Help
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Islamabad Student
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Grade 9
                  </a>
                </li>
              </ul>
              <Button
                title="View project"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 md:mt-6"
              >
                <a href="#">View project</a>
              </Button>
            </div>
          </article> */}


          {/* <article className="border border-border-primary"> */}
          {/* <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"> */}
          {visiblestudents.map((student) => (
            <article key={student._id} className="border border-border-primary rounded overflow-hidden shadow-sm">
              <div>
                <img
                  // src={student.profilePicture || "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"}
                  src={
                    student.profilePicture
                      ? `http://localhost:5000/uploads/${student.profilePicture}`
                      : "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  }
                  className="w-full h-[200px] object-cover"
                  alt={`${student.firstName} ${student.lastName}`}
                />
              </div>
              <div className="px-5 py-6 sm:px-6">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">
                  <a href="#">{`${student.firstName} ${student.lastName}`}</a>
                </h3>
                <p>{`${student.Grade}, ${student.city}`}</p>
                <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
                  <li>
                    <span className="bg-background-secondary px-2 py-1 text-sm font-semibold">
                      {student.city},
                      Class {student.Grade || "N/A"}
                    </span>
                  </li>
                  <li>
                    <span className="bg-background-secondary px-2 py-1 text-sm font-semibold">
                      {/* Grade 10 */}
                      {/* {student.Grade} */}
                    </span>
                  </li>
                </ul>
                <Button
                  title="View project"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                  className="mt-5 md:mt-6"
                >
                  <a href={`http://localhost:5000/api/students/profile/${student._id}`}>View Profile</a>
                </Button>
              </div>
            </article>
          ))}
          {/* </div> */}

          {/* </article> */}

        </div>
        <div className="mt-12 flex justify-center md:mt-18 lg:mt-20">
          <Button
            className="amber-button"
            variant="secondary"
            size="primary"
            title="View all"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        </div>
      </div>
    </section>
  );
}
