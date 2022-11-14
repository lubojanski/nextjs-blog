import {
  GetServerSideProps,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { ParsedUrlQuery, stringify } from "querystring";
import CategorySelector from "../components/CategorySelector";
import Pagination from "../components/Pagination";
import Posts from "../components/Posts";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.css";
import { BlogAPIRes } from "../types";

type PageProps = BlogAPIRes & {
  searchParams: { page: string; search: string };
};

interface Params extends ParsedUrlQuery {
  category: string;
  page: string;
  search: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  ctx
) => {
  const query = ctx.query as Params;
  const searchQuery = query ? stringify(query) : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/posts?${searchQuery}`
  );

  if (res.status === 404) {
    return {
      notFound: true,
    };
  }

  const json: BlogAPIRes = await res.json();

  return {
    props: { ...json, searchParams: query },
  };
};

const Blog: NextPage<PageProps> = (props) => {
  const { posts, categories, pagination } = props;

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Next.js blog </title>
          <meta name="description" content="A homework project" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <main className="p-4 min-h-full flex flex-col align-center justify-center">
        <div className="flex w-full space-2 align-center sm:align-middle flex-col sm:flex-row justify-center sm:justify-end">
          <CategorySelector categories={categories} />
          <SearchBar />
        </div>
        <h1 className="text-4xl text-center font-bold p-6 ">From the blog</h1>
        <h2 className="pb-12  text-xl text-slate-500 text-center font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua.
        </h2>
        {posts?.length ? (
          <>
            <Posts posts={posts} />
            <Pagination
              searchParams={props.searchParams}
              pagination={pagination}
            />
          </>
        ) : (
          <div className="flex h-fit p-20 text-lg justify-center items-center">
            Could not find what you were looking for, please try again.
          </div>
        )}
      </main>
    </>
  );
};

export default Blog;
