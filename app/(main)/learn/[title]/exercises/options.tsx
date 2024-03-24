import { exercisesOptions } from "@/db/Schema";
import Option from "./option";

type Props = {
  options: (typeof exercisesOptions.$inferSelect)[];
  onClick: (id: number) => void;
  selected: number;
  status: "correct" | "wrong" | "none" | "complete";
};
const Options = ({ options, onClick, selected }: Props) => {
  return (
    <div className="flex flex-col gap-y-3">
      {options &&
        options.map((option) => {
          return (
            <Option
              key={option.exerciseOptionId}
              onClick={() => onClick(option.exerciseOptionId)}
              isCorrent={option.isCorrent}
              content={option.content}
              id={option.exerciseOptionId}
              selected={selected}
            />
          );
        })}
    </div>
  );
};

export default Options;
