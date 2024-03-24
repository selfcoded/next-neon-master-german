"use client";
import { Button } from "@/components/ui/button";
import { lessons } from "@/db/Schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  title: string;
  content: typeof lessons.$inferSelect.content;
};
const LessonDisplay = ({ title, content }: Props) => {
  const pathname = usePathname();
  return (
    <div className="p-5 grow  border-b-2 border-slate-300">
      <div
        className="text-center"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div
        className={cn(
          "flex justify-end my-3",
          pathname.indexOf("exercises") !== -1 && "hidden"
        )}
      >
        <Button asChild variant={"secondary"}>
          <Link href={`/learn/${title}`}>start practice</Link>
        </Button>
      </div>
    </div>
  );
};

export default LessonDisplay;
