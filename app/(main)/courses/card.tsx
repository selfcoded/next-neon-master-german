import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};
const Card = ({ title, id, imageSrc, onClick, disabled, active }: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex gap-x-2 p-2 items-center min-h-12",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <Image
        src={imageSrc}
        alt={title}
        height={40}
        width={40}
        className="rounded-xl"
      />
      <p className="text-nowrap overflow-hidden text-ellipsis capitalize">
        {title}
      </p>
    </div>
  );
};

export default Card;
