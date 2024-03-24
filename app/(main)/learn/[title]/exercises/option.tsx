import { exercisesOptions } from "@/db/Schema";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

type Props = {
  content: string;
  isCorrent: boolean;
  //   id: number
  onClick: () => void;
  id: number;
  selected: number;
};

const Option = ({ content, onClick, id, selected }: Props) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  return (
    <div
      className={cn(
        "bg-slate-300 px-5 py-2 rounded-xl border-b-2 hover:border-b-[1px] cursor-pointer",
        selected === id && "bg-blue-300"
      )}
      onClick={handleClick}
    >
      <span>{id}. </span>
      {content}
    </div>
  );
};

export default Option;
