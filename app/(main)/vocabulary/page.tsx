import React from "react";
import Header from "./header";
import RightSidebar from "./rightSidebar";
import SearchResult from "./searchResult";
import { getQueryVocalbularies } from "@/actions/vocal";
import { partOfSpeechs, vocalbularies } from "@/db/Schema";
import { getPartOfSpeechs, getVocalbularies } from "@/db/queries";

const page = async ({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) => {
  let queryVocalbulary = null;
  if (searchParams.query) {
    queryVocalbulary = await getQueryVocalbularies(searchParams.query);
  }
  const myVocalbularies = await getVocalbularies("user");
  const partOfSpeechss = await getPartOfSpeechs();
  return (
    <div className="flex gap-x-10 h-full">
      <div className="grow flex flex-col gap-y-5 overflow-scroll h-full">
        <Header />
        <SearchResult
          queryVocalbulary={queryVocalbulary}
          partOfSpeechs={partOfSpeechss}
        />
      </div>
      <div className="h-full relative">
        <RightSidebar
          myVocalbularies={myVocalbularies}
          partOfSpeechs={partOfSpeechss}
        />
      </div>
    </div>
  );
};

export default page;
