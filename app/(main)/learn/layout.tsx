import React from "react";
import Header from "./header";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const userProgress = await getUserProgress();
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="w-full h-full">
      <Header title={userProgress.activeCourse.title} />
      {children}
    </div>
  );
};

export default layout;
