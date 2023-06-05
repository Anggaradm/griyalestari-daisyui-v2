import React from "react";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex flex-col justify-between">
        {/* Konten lain di sini */}

        <footer className="bg-gray-200 py-4 text-center text-gray-600">
          <p className="text-sm">
            &copy; {currentYear} Griya Lestari. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Copyright;
