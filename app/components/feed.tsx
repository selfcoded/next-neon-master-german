import Header from "../(main)/learn/header";

type Props = {
  children: React.ReactNode;
};

const Feed = ({ children }: Props) => {
  return <div className="flex-1 relative top-0 pb-10">{children}</div>;
};

export default Feed;
