"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { partOfSpeechs, vocalbularies } from "@/db/Schema";
import { cn } from "@/lib/utils";
import { SquareChevronLeftIcon, SquareChevronRightIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {
  myVocalbularies:
    | (typeof vocalbularies.$inferSelect & {
        partOfSpeech: typeof partOfSpeechs.$inferSelect;
      })[]
    | null;
  partOfSpeechs: (typeof partOfSpeechs.$inferSelect)[];
};
const RightSidebar = ({ myVocalbularies, partOfSpeechs }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative h-full w-full shadow-lg border-l-[1px] border-slate-200">
      <div
        className=" absolute top-[50%] -left-[45px] animate-pulse"
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? (
          <SquareChevronLeftIcon
            width={50}
            height={50}
            className="text-slate-300"
          />
        ) : (
          <SquareChevronRightIcon
            width={50}
            height={50}
            className="text-slate-300"
          />
        )}
      </div>
      <div className={cn("w-[268px]", !isOpen ? "hidden" : "block")}>
        <h2 className="text-md font-semibold py-2 text-center bg-green-500">
          my vocalbularies
        </h2>
        <Accordion type="single" collapsible className="w-full px-4">
          {partOfSpeechs &&
            partOfSpeechs.map((partOfSpeech, index) => {
              return (
                <div key={index}>
                  <AccordionItem value={"item" + index}>
                    <AccordionTrigger>
                      {partOfSpeech.partOfSpeech}
                    </AccordionTrigger>
                    {myVocalbularies &&
                      myVocalbularies.map((myVocalbulary, i) => {
                        if (myVocalbulary.partOfSpeech.id === partOfSpeech.id) {
                          return (
                            <AccordionContent key={i}>
                              {myVocalbulary.vocalbulary}
                            </AccordionContent>
                          );
                        }
                      })}
                  </AccordionItem>
                </div>
              );
            })}
        </Accordion>
      </div>
    </div>
  );
};

export default RightSidebar;
