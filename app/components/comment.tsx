import { Button } from "@/components/ui/button";
import { comments } from "@/db/Schema";
import Image from "next/image";

type Value = {
  value: {
    username: string;
    commentId: typeof comments.$inferSelect.commentId;
    userId: number | string;
    userImageSrc: string;
    comments: string;
    createAt: Date;
  };
};

const Comment = ({ value }: Value) => {
  if (!value) return;
  return (
    <div className="h-full p-2 flex-1 flex flex-col gap-y-3 justify-end items-center">
      <div className="flex w-full justify-start items-center gap-x-3 p-2 bg-green-100 rounded-md">
        <div className="">
          <Image
            width={40}
            height={40}
            src={"/unknown.png"}
            alt={value.username}
            className="rounded-full"
          />
        </div>
        <div className="w-full ">
          <div className="flex justify-between w-full border-b-2 border-slate-400 pb-1">
            <h4 className="font-bold">{value.username}</h4>
            <span className="text-end text-xs">
              {value.createAt
                .toString()
                .substring(0, value.createAt.toString().indexOf("GMT"))}
            </span>
          </div>
          <div className="py-2">
            <p>{value.comments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
