import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Ghost } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div className="sticky top-[70px] lg:top-5 left-0  flex justify-between items-center py-2 border-b-2 text-slate-400  border-slate-400">
      <Link href="/courses">
        <Button variant={"ghost"}>
          <ArrowLeftIcon width={16} height={16} />
        </Button>
      </Link>
      <h1 className="font-bold text-lg capitalize">{title}</h1>
      <div />
    </div>
  );
};

export default Header;
