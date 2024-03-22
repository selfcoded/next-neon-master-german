import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className=" p-0 z-[50]" side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
