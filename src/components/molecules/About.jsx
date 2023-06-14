import React from "react";

const About = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://source.unsplash.com/500x600?super-hero"
            className="rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Tentang Kami</h1>
            <p className="py-6 text-justify">
              Griya Lestari merupakan rumah kos pilihan terbaik dengan fasilitas
              kamar yang lengkap serta akses internet gratis. Fasilitas umum
              antara lain parkiran luas, dapur bersama, dan area jemur. Lokasi
              strategis dekat pabrik dan jalan raya. Kami juga menawarkan
              pelayanan yang ramah dan profesional untuk memastikan kenyamanan
              anda selama tinggal di sini. Daftarkan diri Anda segera dan
              nikmati kenyamanan di rumah kos kami.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
