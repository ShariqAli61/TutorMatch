"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Product2() {
  const [teachers, setTeachers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const visibleTeachers = showAll ? teachers : teachers.slice(0, 4); // 2 rows = 2 × 4 = 8 cards


  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem('token'); // or wherever you store your JWT
        console.log("JWT Token:", token);
        const res = await axios.get('http://localhost:5000/api/teachers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTeachers(res.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
        console.error("Error fetching teachers:", err.response?.data || err.message);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <section id="relume" className="bodycolor px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-end gap-12 md:mb-18 md:grid-cols-[1fr_max-content] lg:mb-20 lg:gap-20">
          <div className="max-w-lg">
            {/* <p className="mb-3 font-semibold md:mb-4">Tutors</p> */}
            <h1 className="mb-3 text-5xl font-bold md:mb-4 md:text-7xl lg:text-8xl">
              Tutors
            </h1>
            <p className="md:text-md">
              Explore our qualified tutors ready to help you!
            </p>
          </div>
          <div className="hidden md:flex">
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
        {/* <div className="grid grid-cols-2 justify-items-start gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 lg:grid-cols-4"> */}
        {/* <div>
            <a className="mb-3 block aspect-[5/6] md:mb-4">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </a>
            <a className="flex justify-between md:text-md">
              <div className="mr-4">
                <h3 className="font-semibold">John Doe</h3>
                <div className="text-sm">Math</div>
              </div>
              <div className="text-md font-semibold md:text-lg">$45</div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Add to cart"
              className="amber-button mt-3 w-full md:mt-4"
            >
              Add to cart
            </Button>
          </div> */}


        <div className="grid grid-cols-2 justify-items-start gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 lg:grid-cols-4" >
          {visibleTeachers.map((teacher) => (
            <div key={teacher._id}>
              <a className="mb-3 block aspect-[5/6] md:mb-4">
                <img
                  src={
                    teacher.profilePicture
                      ? `http://localhost:5000/uploads/${teacher.profilePicture}`
                      : "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  }
                  alt={teacher.firstName}
                  className="size-full object-cover"
                />
              </a>
              <a className="flex justify-between md:text-md">
                <div className="mr-4">
                  <h3 className="font-semibold">{teacher.firstName} {teacher.lastName}</h3>
                  <div className="text-sm">{teacher.subjects?.[0] || "N/A"}</div>
                </div>
                <div className="text-md font-semibold md:text-lg">${teacher.rate || 45}</div>
              </a>

              <Link to={`/teacher/${teacher._id}`}>
                <Button variant="secondary" size="sm" title="Book Now" className="amber-button mt-3 w-full md:mt-4">
                  Book Now
                </Button>
              </Link>

            </div>
          ))}
        </div>




      </div>
      {/* </div> */}
    </section>
  );
}
