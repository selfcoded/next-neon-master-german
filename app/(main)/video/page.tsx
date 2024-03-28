import React from "react";
import VideoContainer from "./videoContainer";
import { getVideoScripts } from "@/db/queries";

const page = async () => {
  const getVideoScript = await getVideoScripts(1);
  return (
    <div>
      <VideoContainer getVideoScript={getVideoScript} />
    </div>
  );
};

export default page;
