import dynamic from "next/dynamic";

const ReactAdmin = dynamic(() => import("../../components/ReactAdmin"), {
  ssr: false,
});

const HomePage = () => {
  return <ReactAdmin />;
};

export default HomePage;
