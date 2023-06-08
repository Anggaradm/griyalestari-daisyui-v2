import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">Admin Name</h1>
      <div className="py-6 flex flex-col items-center">
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
          <li>
            <Link>
              <Icon.Users size={15} />
              Daftar Booking
              <span className="badge badge-sm">99+</span>
            </Link>
          </li>
          <li>
            <Link>
              <Icon.CheckCircle size={15} />
              Terima Pembayaran
              <span className="badge badge-sm">99+</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminProfile;
