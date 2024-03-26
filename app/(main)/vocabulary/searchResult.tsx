"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogBody from "./dialogBody";
import { auth } from "@clerk/nextjs";
import { redirect, useSearchParams } from "next/navigation";
import { getPartOfSpeechs, getVocalbularies } from "@/db/queries";
import { getQueryVocalbularies } from "@/actions/vocal";
import { partOfSpeechs, vocalbularies } from "@/db/Schema";
type Props = {
  queryVocalbulary:
    | (typeof vocalbularies.$inferSelect & {
        partOfSpeech: typeof partOfSpeechs.$inferSelect;
      })
    | null;
  partOfSpeechs: (typeof partOfSpeechs.$inferSelect)[];
};

const SearchResult = ({ queryVocalbulary, partOfSpeechs }: Props) => {
  const searchParams = useSearchParams();
  return (
    <div className="shadow-xl mt-5 p-5 bg-green-400 h-[calc(100%-80px)]">
      <div className="h-full w-full flex flex-col gap-y-5 justify-start items-center">
        {!searchParams.get("query") ? (
          <h1>type something</h1>
        ) : (
          <>
            {queryVocalbulary === null ? (
              <>
                <h1 className="font-extrabold capitalize">
                  there are nothing found!
                </h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>create your own vocabulary base</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>create your own vocabulary base</DialogTitle>
                      <DialogDescription>
                        Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <DialogBody partOfSpeechs={partOfSpeechs} />
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <div className="w-full h-full flex flex-col gap-y-4">
                <div className="flex justify-between">
                  <h1 className="font-extrabold">
                    {queryVocalbulary.vocalbulary}:
                  </h1>
                  <div>{queryVocalbulary.partOfSpeech.partOfSpeech}</div>
                  <div />
                </div>
                {queryVocalbulary.meaning.map((value, index) => {
                  if (value === "") return;

                  return (
                    <div key={index}>
                      <h3>
                        meaning {index + 1}: {value}
                      </h3>
                    </div>
                  );
                })}
                {queryVocalbulary.usage.map((value, index) => {
                  if (value === "") return;
                  return (
                    <div key={index}>
                      <h3>
                        usage {index + 1}: {value}
                      </h3>
                    </div>
                  );
                })}
                <div></div>
                {/* {JSON.stringify(queryVocalbulary)} */}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
