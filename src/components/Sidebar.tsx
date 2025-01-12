'use client'

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaInfinity } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const Sidebar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const handleLogout = async () => {
    if(loading) return;
    setLoading(true)
    await signOut({
      redirect: false,
    });
    router.push("/auth");
    setLoading(false)
  };

  return (
    <div className="w-35 flex flex-col items-center p-4 h-full">
      <div className="mb-12 cursor-pointer text-white">
        <FaInfinity size={35} />
      </div>

      <div
        // onClick={handleChats}
        className={`mb-6 text-gray-400 flex flex-col cursor-pointer items-center hover:text-white hover:bg-gray-700 rounded-lg h-[10%] w-[70px] justify-center ${"text-white bg-gray-700"
          } rounded-lg h-[10%] w-[70px] justify-center`}
      >
        <FaMessage className="h-[24px] w-[24px]" />
        <span className="text-[13px]">Chat</span>
      </div>

      <div
        className="mt-auto text-gray-400 flex flex-col cursor-pointer items-center hover:text-white hover:bg-gray-700 rounded-lg h-[10%] w-[70px] justify-center"
        onClick={handleLogout}
      >
        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-gray-100"></div> : <CgLogOut className="h-[24px] w-[24px]" />}
        <span className="text-[13px]">{loading ? "Logging out" : "Logout"}</span>
      </div>
    </div>
  );
};

export default Sidebar;
