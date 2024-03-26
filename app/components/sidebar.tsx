import { cn } from "@/lib/utils";
import SidebarItem from "./sidebarItem";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};
const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:w-[256px] h-screen lg:fixed left-0 top-0 border-r-2 ",
        className
      )}
    >
      <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3 text-blue-600">
        <h1 className="text-lg font-extrabold">Master German</h1>
      </div>
      <div className="flex px-2  flex-col gap-y-2 flex-1">
        <SidebarItem label="learn" href="/learn" iconSrc="/unknown.png" />
        <SidebarItem
          label="vocabulary"
          href="/vocabulary"
          iconSrc="/unknown.png"
        />
        <SidebarItem label="video" href="/video" iconSrc="/unknown.png" />
        <SidebarItem label="writing" href="/writing" iconSrc="/unknown.png" />
      </div>
      <div className="p-5 flex justify-end">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          {
            //issue: mobile version clerk popup cannot be clicked to logout or other
          }
          <UserButton userProfileMode={"navigation"} afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Sidebar;
