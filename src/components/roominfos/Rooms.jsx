import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomNumber from "./RoomNumber";

const Rooms = () => {
  const navigate = useNavigate();

  // consumeAPI
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    await axios
      .get(`${serverUrl}/rooms/guest`)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const letters = rooms.map((room) => room.roomTag);
  const roomLetter = [...new Set(letters)];

  return (
    <>
      <div className="lg:max-w-[50%] flex items-center justify-center flex-col mx-auto">
        <div className="flex flex-wrap justify-center gap-12">
          <div className="w-full my-12 text-4xl font-medium text-center">
            <h2>Pilihan Kamar</h2>
            <div className="flex flex-col gap-4 mt-12 p-4">
              <ul className="menu menu-sm rounded-box">
                <li className="flex flex-row justify-start items-center italic text-base font-light">
                  <span className="w-1 h-1 rounded-full bg-accent border"></span>
                  <a>*Kamar kosong</a>
                </li>
                <li className="flex flex-row justify-start items-center italic text-base font-light">
                  <span className="w-1 h-1 rounded-full bg-disabled border"></span>
                  <a>*Kamar terisi</a>
                </li>
              </ul>
              {roomLetter.map((letter, index) => (
                <div className="flex flex-col gap-4 mt-12 items-start">
                  <h3 className="text-xl font-medium">{`Kamar ${letter}`}</h3>
                  <div className="flex flex-wrap gap-4">
                    {rooms
                      .filter((room) => room.roomTag === letter)
                      .sort((a, b) => a.roomNumber - b.roomNumber)
                      .map((room, index) => (
                        <RoomNumber
                          key={index}
                          roomNumber={`${room.roomNumber}${room.roomTag}`}
                          addStyle="btn-accent hover:opacity-80"
                          disabled={room.isEmpty ? "" : "disabled"}
                          onClick={() => navigate(`/roominfo/${room._id}`)}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
