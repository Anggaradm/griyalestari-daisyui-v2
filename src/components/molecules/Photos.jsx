import React from "react";
import { Link } from "react-router-dom";
import PhotoCard from "../atoms/PhotoCard";

const Photos = () => {
  return (
    <>
      <div className="lg:max-w-[50%] flex items-center justify-center flex-col mx-auto py-12">
        <div className="flex flex-wrap justify-center gap-12">
          <div className="w-full my-12 text-4xl font-medium text-center">
            <h2>Kos Griya Lestari</h2>
          </div>
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
        </div>

        <div className="mt-24">
          <Link to="/inforoom" className="btn btn-primary btn-lg">
            Pesan Kamar Sekarang
          </Link>
        </div>
      </div>
    </>
  );
};

export default Photos;
