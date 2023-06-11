import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const UserBooking = () => {
  // consumeAPI
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/dashboard");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (user && user.userStatus !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${serverUrl}/users`);
    const datas = response.data;
    const userGuest = datas?.filter((data) => data.userStatus === "guest");
    setUsers(userGuest);
  };

  //   useEffect(() => {
  //     console.log(users);
  //   }, [users]);

  // #######pagination########
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const totalPages = Math.ceil(users?.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const userItems = users?.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((pageNumber) => pageNumber + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((pageNumber) => pageNumber - 1);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Daftar Booking
      </h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra table-pin-cols md:table-pin-rows">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Nama</th>
                <th>Email</th>
                <th>Nomor Handphone</th>
                <th>Pilihan</th>
              </tr>
            </thead>
            <tbody>
              {/* row mapping */}
              {userItems
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                    <th>{user.name}</th>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div>
                        <div className="flex gap-2">
                          <a
                            href={`mailto:${user.email}`}
                            className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                          >
                            <Icon.Mail size={20} />
                          </a>
                          <a
                            target="_blank"
                            href={`https://wa.me/6287771289730?text=Halo,%20kami%20dari%20Griya%20Kost%20Lestari.%20Kami%20melihat%20anda%20melakukan%20booking%20pada%20Website%20kami,%20untuk%20saat%20ini%20ada%20beberapa%20kamar%20yang%20siap%20ditempati.%20Silakan%20menghubungi%20kami%20di%20nomor%20ini%20%F0%9F%98%89.`}
                            className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                            rel="noreferrer"
                          >
                            <Icon.MessageCircle size={20} />
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="join mt-12">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="join-item btn"
          >
            «
          </button>
          <button className="join-item btn">halaman {currentPage}</button>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="join-item btn"
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};

export default UserBooking;
