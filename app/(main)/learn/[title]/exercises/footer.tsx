import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useKey } from "react-use";

type Props = {
  onCheck: () => void;
  disabled: boolean;
  status: "correct" | "wrong" | "none" | "complete";
};
const Footer = ({ onCheck, disabled, status }: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const pathname = usePathname();
  return (
    <footer className="w-full pt-8 flex justify-end">
      {status === "complete" && (
        <Button className="mr-6" asChild>
          <Link href={pathname.substring(0, pathname.lastIndexOf("/"))}>
            back
          </Link>
        </Button>
      )}
      <Button onClick={onCheck} disabled={disabled}>
        {status === "none" && "check"}
        {status === "wrong" && "retry"}
        {status === "complete" && "done"}
      </Button>
    </footer>
  );
};

export default Footer;
