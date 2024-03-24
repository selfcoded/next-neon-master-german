import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = ({ params }: { params: { title: string } }) => {
  return (
    <div className="h-[calc(100%-50px)] w-full flex flex-col gap-y-4 justify-center items-center">
      <h1>
        in this session you'll have <strong>5</strong> exercises about{" "}
        {params.title}
      </h1>

      <Button asChild>
        <Link href={`/learn/${params.title}/exercises`}>start your journy</Link>
      </Button>
    </div>
  );
};

export default page;
