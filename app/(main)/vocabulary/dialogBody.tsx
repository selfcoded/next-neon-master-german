"use client";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useState, useTransition } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { partOfSpeechs, vocalbularies } from "@/db/Schema";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { upsertVocalbularies } from "@/actions/vocal";
import { toast } from "sonner";

type Props = {
  vocalbularies?: typeof vocalbularies.$inferSelect &
    {
      partOfSpeechs: (typeof partOfSpeechs.$inferSelect)[];
    }[];
  partOfSpeechs: (typeof partOfSpeechs.$inferSelect)[];
};
const DialogBody = ({ partOfSpeechs }: Props) => {
  const [pending, startTransition] = useTransition();
  const [vocalData, setVocalData] = useState<{
    vocalbulary: string;
    meaning: string;
    usage: string;
    partOfSpeechId: number;
  }>({
    vocalbulary: "",
    meaning: "",
    usage: "",
    partOfSpeechId: 0,
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVocalData({
      ...vocalData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    if (
      vocalData.vocalbulary === "" ||
      vocalData.meaning === "" ||
      vocalData.usage === "" ||
      vocalData.partOfSpeechId === 0
    )
      return;
    startTransition(async () => {
      await upsertVocalbularies(vocalData).catch(() =>
        toast.error("something went wrong!")
      );
    });
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-3 items-center">
        <span className="capitalize font-bold">vocalbulary:</span>
        <Input
          required
          name="vocalbulary"
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className="flex gap-x-3 items-center">
        <span className="capitalize font-bold">meaning:</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                required
                name="meaning"
                onChange={(e) => handleOnChange(e)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>multip meanings separated with ","</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-x-3 items-center">
        <span className="capitalize font-bold">usage:</span>
        <Input required name="usage" onChange={(e) => handleOnChange(e)} />
      </div>
      <div className="flex gap-x-3 items-center">
        <span className="capitalize font-bold">part of speech:</span>
        <Select
          onValueChange={(e) =>
            setVocalData({ ...vocalData, partOfSpeechId: Number(e) })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a word class" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>part of speech</SelectLabel>
              {partOfSpeechs.map((partOfSpeech) => (
                <SelectItem
                  key={partOfSpeech.id}
                  value={String(partOfSpeech.id)}
                >
                  {partOfSpeech.partOfSpeech}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button variant={"destructive"}>cancel</Button>
        <Button onClick={onSubmit}>save</Button>
      </DialogFooter>
    </div>
  );
};

export default DialogBody;
