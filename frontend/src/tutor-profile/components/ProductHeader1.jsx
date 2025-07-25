"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
import React, { Fragment, useEffect, useState } from "react";

const Star = () => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const isFullStar = i < fullStars;
        const isHalfStar = hasHalfStar && i === fullStars;

        return (
          <div key={i}>
            {isFullStar ? (
              <BiSolidStar />
            ) : isHalfStar ? (
              <BiSolidStarHalf />
            ) : (
              <BiStar />
            )}
          </div>
        );
      })}
    </div>
  );
};

const useCarousel = () => {
  const [mainApi, setMainApi] = useState();
  const [thumbApi, setThumbApi] = useState();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!mainApi || !thumbApi) {
      return;
    }
    mainApi.on("select", () => {
      const index = mainApi.selectedScrollSnap();
      setCurrent(index);
      thumbApi.scrollTo(index);
    });
  }, [mainApi, thumbApi]);
  const handleClick = (index) => () => {
    return mainApi?.scrollTo(index);
  };
  const getThumbStyles = (index) => {
    return clsx("block", current === index && "opacity-60");
  };
  return {
    setMainApi,
    setThumbApi,
    handleClick,
    getThumbStyles,
  };
};

export function ProductHeader1() {
  const useActive = useCarousel();
  return (
    <header id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <Breadcrumb className="mb-6 flex flex-wrap items-center text-sm">
          <BreadcrumbList>
            <Fragment>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Explore Tutors</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
            <Fragment>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Tutors</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
            <Fragment>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">John Doe</BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-1 gap-y-8 md:gap-y-10 lg:grid-cols-[1.25fr_1fr] lg:gap-x-20">
          <div className="grid grid-cols-1 md:grid-cols-[5rem_1fr] md:gap-x-4">
            <div className="relative hidden h-full md:block">
              <div className="absolute bottom-0 top-0 max-h-full overflow-y-auto">
                <Carousel
                  setApi={useActive.setThumbApi}
                  orientation="vertical"
                  opts={{
                    align: "start",
                    containScroll: "keepSnaps",
                    dragFree: true,
                  }}
                  className="m-0"
                >
                  <CarouselContent className="m-0 gap-y-4">
                    <CarouselItem className="p-0">
                      <button
                        onClick={useActive.handleClick(0)}
                        className={useActive.getThumbStyles(0)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 1"
                          className="aspect-[5/6] size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                    <CarouselItem className="p-0">
                      <button
                        onClick={useActive.handleClick(1)}
                        className={useActive.getThumbStyles(1)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 2"
                          className="aspect-[5/6] size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                    <CarouselItem className="p-0">
                      <button
                        onClick={useActive.handleClick(2)}
                        className={useActive.getThumbStyles(2)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 3"
                          className="aspect-[5/6] size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                    <CarouselItem className="p-0">
                      <button
                        onClick={useActive.handleClick(3)}
                        className={useActive.getThumbStyles(3)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 4"
                          className="aspect-[5/6] size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
            <div className="overflow-hidden">
              <Carousel
                setApi={useActive.setMainApi}
                opts={{ loop: true, align: "start" }}
                className="m-0"
              >
                <CarouselContent className="m-0">
                  <CarouselItem className="basis-full pl-0">
                    <button>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 1"
                        className="aspect-[5/6] size-full object-cover"
                      />
                    </button>
                  </CarouselItem>
                  <CarouselItem className="basis-full pl-0">
                    <button>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 2"
                        className="aspect-[5/6] size-full object-cover"
                      />
                    </button>
                  </CarouselItem>
                  <CarouselItem className="basis-full pl-0">
                    <button>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 3"
                        className="aspect-[5/6] size-full object-cover"
                      />
                    </button>
                  </CarouselItem>
                  <CarouselItem className="basis-full pl-0">
                    <button>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 4"
                        className="aspect-[5/6] size-full object-cover"
                      />
                    </button>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          <div>
            <h1 className="mb-2 text-4xl font-bold leading-[1.2] md:text-5xl lg:text-6xl">
              John Doe
            </h1>
            <p className="mb-5 text-xl font-bold md:mb-6 md:text-2xl">$55</p>
            <div className="mb-5 flex flex-wrap items-center gap-3 md:mb-6">
              <Star rating={3.5} />
              <p className="text-sm">(4.0 stars) • 15 reviews</p>
            </div>
            <p className="mb-5 md:mb-6">
              John is a dedicated educator with over 5 years of experience. He
              specializes in mathematics and science, helping students achieve
              their academic goals.
            </p>
            <form className="mb-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col">
                  <Label className="mb-2">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-choice">Option One</SelectItem>
                      <SelectItem value="second-choice">Option Two</SelectItem>
                      <SelectItem value="third-choice">Option Three</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label className="mb-2">Type</Label>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-4 py-2"
                    >
                      Online Session
                    </a>
                    <a
                      href="#"
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-4 py-2"
                    >
                      In-Person Session
                    </a>
                    <a
                      href="#"
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-4 py-2 pointer-events-none opacity-25"
                    >
                      Unavailable
                    </a>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="quantity" className="mb-2">
                    Amount
                  </Label>
                  <Input
                    type="number"
                    id="quantity"
                    placeholder="1"
                    className="w-16"
                  />
                </div>
              </div>
              <div className="mb-4 mt-8 flex flex-col gap-y-4">
                <Button title="Book a Session">Book a Session</Button>
                <Button title="Message Tutor" variant="secondary">
                  Message Tutor
                </Button>
              </div>
              <p className="text-center text-xs">
                Free consultation available!
              </p>
            </form>
            <Accordion type="multiple">
              <AccordionItem value="item-0">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Overview
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  If you need to cancel a session, please notify John at least
                  24 hours in advance. Refunds are available for cancellations
                  made within this timeframe. Your satisfaction is our priority.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Delivery
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  If you need to cancel a session, please notify John at least
                  24 hours in advance. Refunds are available for cancellations
                  made within this timeframe. Your satisfaction is our priority.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Policy
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  If you need to cancel a session, please notify John at least
                  24 hours in advance. Refunds are available for cancellations
                  made within this timeframe. Your satisfaction is our priority.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </header>
  );
}
