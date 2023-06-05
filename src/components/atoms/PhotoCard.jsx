import React from "react";

const PhotoCard = () => {
  return (
    <>
      <div className="card w-72 lg:max-w-[256px] overflow-hidden shadow-xl hover:scale-150 hover:m-12 hover:shadow-lg transition-all duration-200 group delay-200">
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-base-100/0 group-hover:from-transparent group-hover:via-transparent group-hover:to-transparent"></div>
        <figure>
          <img src="https://source.unsplash.com/300x300?building" alt="Card" />
        </figure>
        <div className="absolute z-10 bottom-6 right-[50%] translate-x-[50%]">
          <h3 className="text-center font-medium text-xl text-LightMColor group-hover:text-transparent">
            Place
          </h3>
        </div>
      </div>
    </>
  );
};

export default PhotoCard;
