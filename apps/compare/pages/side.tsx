import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { prismaClient } from "../prisma/prismaClient";

// export async function getServerSideProps() {}
const Home: NextPage = ({}) => {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
};
export default Home;
