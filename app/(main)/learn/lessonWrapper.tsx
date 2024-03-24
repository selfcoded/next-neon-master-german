import { Button } from "@/components/ui/button";
import { lessons } from "@/db/Schema";
import { getLessons, getLessonsCopy } from "@/db/queries";
import Link from "next/link";

type Props = {
  courseId: typeof lessons.$inferSelect.courseId;
  href: string;
};

const LessonWrapper = async ({ courseId, href }: Props) => {
  if (!courseId) return;
  const lessonsPromise = getLessons(courseId);
  const lessonCopy = getLessonsCopy();
  const [lessons] = await Promise.all([lessonsPromise]);
  // if (lessons.length === 0) {
  //   return (
  //     <>
  //       <div className="h-[calc(100%-56px)] w-full flex justify-center items-center">
  //         <h1>there is no data</h1>
  //       </div>
  //     </>
  //   );
  // }
  return (
    <div className="flex flex-col gap-y-4 pt-5">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="bg-slate-100 shadow-md rounded-xl px-5 py-2 flex justify-between items-center"
        >
          <div>
            <h1 className="font-bold capitalize">{lesson.title}</h1>
            <p className="text-sm">{lesson.introduction}</p>
          </div>
          <Button size={"sm"} variant={"secondary"} className="p-2" asChild>
            <Link
              className="text-[8px]"
              href={`${href}/${lesson.title.split(" ").join("-")}`}
            >
              {href === "learn" ? "start" : "read more"}
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default LessonWrapper;
