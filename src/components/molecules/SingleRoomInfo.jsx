import React from "react";

const SingleRoomInfo = () => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">Kamar nomor 2A</h1>
      <div className="py-6 flex flex-col items-center">
        <div className="stats stats-vertical lg:stats-horizontal bg-base-100 text-primary-content">
          <div className="stat flex flex-col gap-2">
            <div>
              <div className="stat-title">Tanggal Masuk</div>
              <div className="stat-value text-lg font-medium">27-5-2023</div>
            </div>
            <div>
              <div className="stat-title">Jumlah Penghuni</div>
              <div className="stat-value text-lg font-medium">2 orang</div>
            </div>
            <div>
              <div className="stat-title">Tagihan</div>
              <div className="stat-value text-lg font-medium">Rp 500.000</div>
            </div>
          </div>

          <div className="stat">
            <div className="flex flex-col justify-center">
              <div className="stat-title">Tenggat waktu</div>
              <div className="stat-value text-xl font-medium">2 hari lagi</div>
              <div className="stat-actions">
                <button className="btn btn-sm">Bayar Sekarang</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRoomInfo;
