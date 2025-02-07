"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BrowseStyle {
  name: string;
  image: string;
  href: string;
}

const browseCategories: BrowseStyle[] = [
  {
    name: "Casual",
    image: "/products/browse/browse1.png",
    href: "/shop",
  },
  {
    name: "Formal",
    image: "/products/browse/browse2.png",
    href: "/shop",
  },
  {
    name: "Party",
    image: "/products/browse/browse3.png",
    href: "/shop",
  },
  {
    name: "Gym",
    image: "/products/browse/browse4.png",
    href: "/shop",
  },
];

const BrowseStyle = () => {
  return (
    <div className="mx-auto max-w-[1240px] px-4 py-8 md:py-12">
      <div className="rounded-[32px] bg-[#F0F0F0] p-6 md:p-8">
        <h2 className="mb-6 text-center text-2xl font-bold md:mb-8 md:text-[32px]">
          BROWSE BY DRESS STYLE
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Link
              href={browseCategories[0].href}
              className="group relative h-[200px] w-full overflow-hidden rounded-2xl bg-white md:h-[240px] md:w-1/2"
            >
              <Image
                src={browseCategories[0].image}
                alt={browseCategories[0].name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0">
                <h3 className="absolute top-4 left-4 text-xl text-black md:text-2xl">
                  {browseCategories[0].name}
                </h3>
              </div>
            </Link>
            <Link
              href={browseCategories[1].href}
              className="group relative h-[200px] w-full overflow-hidden rounded-2xl bg-white md:h-[240px] md:w-1/2"
            >
              <Image
                src={browseCategories[1].image}
                alt={browseCategories[1].name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0">
                <h3 className="absolute top-4 left-4 text-xl text-black md:text-2xl">
                  {browseCategories[1].name}
                </h3>
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <Link
              href={browseCategories[2].href}
              className="group relative h-[200px] w-full overflow-hidden rounded-2xl bg-white md:h-[240px] md:w-[60%]"
            >
              <Image
                src={browseCategories[2].image}
                alt={browseCategories[2].name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0">
                <h3 className="absolute top-4 left-4 text-xl text-black md:text-2xl">
                  {browseCategories[2].name}
                </h3>
              </div>
            </Link>
            <Link
              href={browseCategories[3].href}
              className="group relative h-[200px] w-full overflow-hidden rounded-2xl bg-white md:h-[240px] md:w-[40%]"
            >
              <Image
                src={browseCategories[3].image}
                alt={browseCategories[3].name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0">
                <h3 className="absolute top-4 left-4 text-xl text-black md:text-2xl">
                  {browseCategories[3].name}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseStyle;
