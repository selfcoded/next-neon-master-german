import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-100 shadow-xl">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <div className="rounded-md bg-slate-400 p-2">Deutsch</div>
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <div className="rounded-md bg-slate-400 p-2">Englisch</div>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
