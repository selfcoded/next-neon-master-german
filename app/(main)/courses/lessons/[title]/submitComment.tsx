"use client";
import { upsertComments } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  title: string;
};

const SubmitComment = ({ title }: Props) => {
  const [comment, setComment] = useState("");
  const [pending, startTransition] = useTransition();
  const onClick = () => {
    if (pending) return;
    startTransition(() => {
      upsertComments(title, comment).catch(() =>
        toast.error("something went wrong")
      );
    });
  };
  return (
    <div className="w-full h-full">
      <textarea
        className="bottom-5 left-0 h-20 m-2 w-full resize-none rounded-xl p-4"
        name="comment"
        id="comment"
        placeholder="type your comment"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></textarea>
      <div className="w-full flex justify-end items-center">
        <Button variant={"outline"} className="h-8" onClick={onClick}>
          comment
        </Button>
      </div>
    </div>
  );
};

export default SubmitComment;
