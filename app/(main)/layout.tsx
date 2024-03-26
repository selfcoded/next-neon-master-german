import { Toaster } from "@/components/ui/sonner";
import MobileHeader from "../components/mobileHeader";
import Sidebar from "../components/sidebar";

type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="h-full w-full p-5 pr-0 ">
          <Toaster />
          {children}
        </div>
      </main>
    </>
  );
};

export default layout;
