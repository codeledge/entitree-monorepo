import type { NextPage } from "next";

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/chart",
    },
    props: {},
  };
}
const Home: NextPage = () => {
  return <div>Homepage empty</div>;
};

export default Home;
