import dynamic from "next/dynamic";

const ReactAdmin = dynamic(() => import("../../admin/components/ReactAdmin"), {
  ssr: false,
});
const AdminPage = () => {
  return <ReactAdmin />;
};

export default AdminPage;
