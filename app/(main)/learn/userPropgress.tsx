import { Button } from "@/components/ui/button";
import { courses } from "@/db/Schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full py-2">
      <Link href={"/courses"}>
        <Button variant={"ghost"}>
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            width={32}
            height={32}
            className="rounded-md border mr-2"
          />
        </Button>
      </Link>
      <Link href={"/courses"}>
        <Button variant={"ghost"}>
          <Image
            src={activeCourse.imageSrc}
            alt={"hearts"}
            width={32}
            height={32}
            className="rounded-md border mr-2"
          />
          {hearts}
        </Button>
      </Link>
      <Link href={"/courses"}>
        <Button variant={"ghost"}>
          <Image
            src={activeCourse.imageSrc}
            alt={"points"}
            width={32}
            height={32}
            className="rounded-md border mr-2"
          />
          {points}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgress;
