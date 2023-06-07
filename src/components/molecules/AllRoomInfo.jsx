import React, { useState } from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";

const AllRoomInfo = () => {
  const [roomTag, setRoomTag] = useState("A");

  const handleRoomTag = (e) => {
    setRoomTag(e.target.value);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">Informasi Kamar</h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra table-pin-cols md:table-pin-rows">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Kamar</th>
                <th>Jumlah penghuni</th>
                <th>Tagihan</th>
                <th className="text-center">Pilihan</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <th>1{roomTag}</th>
                <td>2 orang</td>
                <td>Rp 600.000</td>
                <td>
                  <div className="flex gap-2">
                    <Link className="btn btn-sm btn-ghost btn-outline">
                      <Icon.PenTool size={15} />
                    </Link>
                    <Link className="btn btn-sm btn-error">
                      <Icon.Trash size={15} />
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="btn-group btn-group-horizontal mt-12">
          <button onClick={handleRoomTag} value="A" className="btn btn-outline">
            A
          </button>
          <button onClick={handleRoomTag} value="B" className="btn btn-outline">
            B
          </button>
          <button onClick={handleRoomTag} value="C" className="btn btn-outline">
            C
          </button>
        </div>
      </div>
    </>
  );
};

export default AllRoomInfo;
