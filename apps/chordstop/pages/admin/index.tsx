//@ts-nocheck
import dynamic from "next/dynamic";

const ReactAdmin = dynamic(() => import("../../components/ReactAdmin"), {
  ssr: false,
});
const AdminPage = () => {
  return <ReactAdmin />;
};

export default AdminPage;
