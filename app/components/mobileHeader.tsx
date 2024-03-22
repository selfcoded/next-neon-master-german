import React from "react";
import MobileSidebar from "./mobileSidebar";

const MobileHeader = () => {
  return (
    <nav className="lg:hidden bg-green-400 px-6 h-[50px] w-full flex items-center border-b top-0 z-50 fixed">
      <MobileSidebar />
    </nav>
  );
};

export default MobileHeader;
