import React from "react";
import * as Icon from "react-feather";

const MemberProfile = () => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Member Profile</h1>
      <div className="py-6 flex flex-col items-center">
        <div className="menu bg-base-200 w-56 rounded-box flex flex-col gap-4">
          <div className="flex gap-6">
            <Icon.User size={20} />
            <span>Harriz Mukarrom</span>
          </div>
          <div className="flex gap-6">
            <Icon.Mail size={20} />
            <span>mukarromhariez@mail.com</span>
          </div>
          <div className="flex gap-6">
            <Icon.Phone size={20} />
            <span>(+62) 87831928756</span>
          </div>
          <div className="flex gap-6">
            <Icon.Briefcase size={20} />
            <span className="text-xs text-error italic">
              silakan lengkapi data anda
            </span>
          </div>
          <div className="flex gap-6">
            <Icon.MapPin size={20} />
            <span className="text-xs text-error italic">
              silakan lengkapi data anda
            </span>
          </div>
          <div className="w-full">
            <button className="btn btn-outline btn-ghost w-full mt-12">
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberProfile;
