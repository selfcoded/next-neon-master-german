import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";

const DynamicApp = dynamic(() => import("./dynamicApp"), { ssr: false });

const AdminPage = () => {
  if (!isAdmin) {
    redirect("/");
  }
  return <DynamicApp />;
};

export default AdminPage;
