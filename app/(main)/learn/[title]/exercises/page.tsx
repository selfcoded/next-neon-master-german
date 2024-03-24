import { getExercises, getLesson, getLessonsCopy } from "@/db/queries";
import Card from "./card";
import Comment from "@/app/components/comment";
import LessonDisplay from "@/app/components/lessonDisplay";

const page = async ({ params }: { params: { title: string } }) => {
  // const lesson = await getLesson(params.title);
  // if (!lesson || !lesson.id) {
  //   return (
  //     <>
  //       <div className="h-[calc(100%-56px)] w-full flex justify-center items-center">
  //         <h1>there is no data</h1>
  //       </div>
  //     </>
  //   );
  // }
  const lessonsCopy = await getLessonsCopy();

  if (!lessonsCopy) return;
  return (
    <>
      {lessonsCopy.map((lesson, index) => {
        if (lesson.title === params.title) {
          return (
            <div
              key={lesson.id}
              className="h-[calc(100%-56px)] w-full flex gap-x-2"
            >
              <Card exercises={lesson.exercises} />
              <div
                key={lesson + String(lesson.id)}
                className="hidden lg:block flex-1 min-w-[348px] shadow-xl"
              >
                <LessonDisplay title={params.title} content={lesson.content} />
                {lesson.comments &&
                  lesson.comments.map((comment) => {
                    return (
                      <div key={comment + String(comment.commentId)}>
                        <Comment value={comment} />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        } else {
          <div className="h-[calc(100%-56px)] w-full flex justify-center items-center">
            <h1>there is no data</h1>
          </div>;
        }
      })}
    </>
  );
};

export default page;
