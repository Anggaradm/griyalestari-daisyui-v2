import React from "react";
import PhotoCard from "../atoms/PhotoCard";

const Photos = () => {
  return (
    <>
      <div className="lg:max-w-[50%] lg:flex lg:items-center lg:justify-center mx-auto py-12">
        <div className="lg:flex lg:flex-wrap lg:justify-center lg:gap-12">
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
        </div>
      </div>
    </>
  );
};

export default Photos;
