import React from "react";

type Props = {
  children: React.ReactNode;
};

const StickyWrapper = ({ children }: Props) => {
  return (
    <div className="hidden bg-green-500 lg:block w-[368px] self-end bottom-6 sticky">
      <div className="min-h-[calc(100vh-48px)]">{children}</div>
    </div>
  );
};

export default StickyWrapper;
