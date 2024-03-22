import React from "react";

const page = ({ params }: { params: { title: string } }) => {
  return <div>here is the questions of the {params.title}</div>;
};

export default page;
