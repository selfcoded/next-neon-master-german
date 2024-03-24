"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Ghost } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  const pathname = usePathname();
  const pathnameSubstring = pathname.substring(pathname.lastIndexOf("/") + 1);
  const pathTitle =
    pathnameSubstring === "learn" || pathnameSubstring === "courses"
      ? title
      : pathnameSubstring === "exercises"
      ? pathname.split("/")[2]
      : pathnameSubstring;
  return (
    <div className="sticky bg-slate-100 z-[150] top-[70px] lg:top-5 left-0  flex justify-between items-center py-2 border-b-2 text-slate-500  shadow-md">
      <Link
        href={
          pathname !== "/learn"
            ? pathname.substring(0, pathname.lastIndexOf("/"))
            : "/courses"
        }
      >
        <Button variant={"ghost"}>
          <ArrowLeftIcon width={16} height={16} />
        </Button>
      </Link>
      <h1 className="font-bold text-lg capitalize">{pathTitle}</h1>
      <div />
    </div>
  );
};

export default Header;
