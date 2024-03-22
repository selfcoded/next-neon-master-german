import React from "react";

const page = ({ params }: { params: { title: string } }) => {
  const { title } = params;

  return <div>here is the {title}</div>;
};

export default page;
