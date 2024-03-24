"use client";

import { exerciseProgress, exercises, exercisesOptions } from "@/db/Schema";
import Options from "./options";
import { useState, useTransition } from "react";
import Footer from "./footer";
import { upsertExerciseProgress } from "@/actions/exercise-progress";
import { toast } from "sonner";

type Props = {
  exercises: (typeof exercises.$inferSelect & {
    exercisesOptions: (typeof exercisesOptions.$inferSelect)[];
  })[];
};

const Card = ({ exercises }: Props) => {
  const [selected, setSelected] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    "correct" | "wrong" | "none" | "complete"
  >("none");
  const exercise = exercises[activeIndex];
  if (!exercise) return;
  const options = exercise?.exercisesOptions;
  const onClick = (id: number) => {
    if (status === "complete") return;
    setSelected(id);
    if (status !== "none") setStatus("none");
  };
  const onNext = () => {
    if (selected) setSelected(0);
    if (exercises.length === activeIndex + 1) {
      setStatus("complete");
      return;
    } else {
      setStatus("none");
      setActiveIndex(activeIndex + 1);
    }
  };
  const onCheck = () => {
    const correntId = options.find((option) => option.isCorrent);
    if (correntId?.exerciseOptionId === selected) {
      onNext();
      startTransition(() => {
        upsertExerciseProgress(exercise.exerciseId).catch(() =>
          toast.error("something went wrong")
        );
      });
    } else {
      setStatus("wrong");
    }
  };

  return (
    <div className="flex grow justify-start p-8 flex-col items-start">
      <h1 className="font-extrabold py-6 capitalize">{exercise.question}</h1>
      <div className="flex w-full flex-col gap-y-3 justify-center items-start">
        {exercise.type === "SINGLE_CHOICE" && (
          <Options
            options={options}
            onClick={onClick}
            selected={selected}
            status={status}
          />
        )}
      </div>
      <Footer
        onCheck={onCheck}
        disabled={!selected || pending}
        status={status}
      />
    </div>
  );
};

export default Card;
