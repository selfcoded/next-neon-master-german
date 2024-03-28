"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { videoScript } from "@/db/Schema";
import { getVideoScripts } from "@/db/queries";
import React, { forwardRef, useState } from "react";
import { CircleCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  handleFocus: () => void;
  getVideoScript: typeof videoScript.$inferSelect | null | undefined;
};

const RightInpupt = React.forwardRef<HTMLInputElement[], Props>(function (
  props,
  ref
) {
  const { handleFocus, getVideoScript } = props;
  const [message, setMessage] = useState({ index: 0, message: "" });
  const handleClick = (value: string, index: number) => {
    if (ref && typeof ref !== "function") {
      if (ref.current !== null) {
        if (ref.current[index].value === value) {
          setMessage({ ...message, index: index, message: "correct" });
        } else {
          // setMessage("wrong");
          setMessage({ ...message, index: index, message: "wrong" });
        }
      }
    }
  };
  return (
    <div className="bg-slate-300 grow flex flex-col gap-y-3 px-3 py-2 min-w-[200px]">
      <div>what did you hear</div>
      {ref &&
        typeof ref !== "function" &&
        ref.current !== null &&
        getVideoScript?.text.map((value, index) => {
          return (
            <div key={index} className="flex flex-col gap-y-2">
              <Input
                ref={(el) => {
                  if (ref.current !== null)
                    ref.current[index] = el as HTMLInputElement;
                }}
                onFocus={handleFocus}
              />
              <div className="flex justify-between">
                <Button onClick={() => handleClick(value, index)}>check</Button>
                <p>{message.index === index && message.message}</p>
                <CircleCheckIcon
                  className={cn(
                    message.index === index &&
                      message.message === "correct" &&
                      "text-green-500"
                  )}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
});

export default RightInpupt;
