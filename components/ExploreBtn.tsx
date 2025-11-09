"use client";

import Image from "next/image";
const ExploreBtn = () => {
  return (
    <>
      <button
        type="button"
        id="explorebtn"
        className="mt-7 mx-auto"
        onClick={() => {
          //console.log("Explore Events Buttong Clicked!!");
        }}
      >
        <a href="#events">
          Explore Events
          <Image
            src="/icons/arrow-down.svg"
            alt="Explore Events"
            width={24}
            height={24}
            className="inline-block ml-2"
          />
        </a>
      </button>
    </>
  );
};

export default ExploreBtn;
