import React from "react";
import { Link } from "react-router-dom";

const DrawerDashboard = () => {
  return (
    <>
      <div className="drawer z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content pt-[5%]">
            {/* Sidebar content here */}

            <li>
              <details>
                <summary>User</summary>
                <ul>
                  <li>
                    <Link to="/dashboard">Profil</Link>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary>Kamar</summary>
                <ul>
                  <li>
                    <Link to="/dashboard/roominfo">Informasi Kamar</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addroom">Tambah Kamar</Link>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary>Pembayaran</summary>
                <ul>
                  <li>
                    <Link to="/dashboard/paymenthistory">
                      Riwayat Pembayaran
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addpayment">Tambah Pembayaran</Link>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary>Pengeluaran</summary>
                <ul>
                  <li>
                    <Link to="/dashboard/maintenance">Daftar Pengeluaran</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addmaintenance">
                      Tambah Pengeluaran
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DrawerDashboard;
