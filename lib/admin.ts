import { auth } from "@clerk/nextjs";

const adminId = [process.env.ADMINUSERID];

export const isAdmin = () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  return adminId.indexOf(userId) !== -1;
};
