import { getCourses, getUserProgress } from "@/db/queries";
import List from "./list";

const CoursesPage = async () => {
  const coursesPromise = getCourses();
  const userProgressPromise = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesPromise,
    userProgressPromise,
  ]);
  return (
    <div className="">
      <List courses={courses} activeCourseId={userProgress?.activeCourseID} />
    </div>
  );
};

export default CoursesPage;
