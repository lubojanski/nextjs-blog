import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery, stringify } from "querystring";
import CategorySelector from "../components/CategorySelector";
import Pagination from "../components/Pagination";
import Posts from "../components/Posts";
import SearchBar from "../components/SearchBar";
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
  const basePath = `https://${ctx.req.rawHeaders[1]}`;
  const query = ctx.query as Params;
  const searchQuery = query ? stringify(query) : "";

  const res = await fetch(`${basePath}/api/posts?${searchQuery}`);

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
      <Head>
        <title>Next.js blog </title>
        <meta name="description" content="A homework project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <div className="flex flex-col h-fit p-20 text-lg justify-center items-center">
            <span>
              Could not find what you were looking for, please try again.
            </span>
            <Link
              href={{
                pathname: "/",
              }}
            >
              <button
                data-cy-testid="prev"
                className="my-6 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Go home
              </button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
};

export default Blog;
