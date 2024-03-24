import { getUserProgress } from "@/db/queries";
import Header from "../../learn/header";
type Props = {
  children: React.ReactNode;
};
const layout = async ({ children }: Props) => {
  const userProgress = await getUserProgress();
  if (!userProgress || !userProgress.activeCourse) return;
  return (
    <div className="h-full">
      <Header title={userProgress.activeCourse.title} />
      <>{children}</>
    </div>
  );
};

export default layout;
