import React from "react";
import PhotoCard from "../atoms/PhotoCard";

const Photos = () => {
  return (
    <>
      <div className="lg:max-w-[50%] flex items-center justify-center flex-col mx-auto py-12">
        <div className="flex flex-wrap justify-center gap-12">
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
