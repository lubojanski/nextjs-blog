import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { Post } from "../../types";
import { getBasePath } from "../../util/getBasePath";

type PageProps = {
  post: Post;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  ctx
) => {
  const { slug } = ctx.params as Params;
  const basePath = getBasePath(ctx);

  const res = await fetch(`${basePath}/api/posts/${slug}`);

  if (res.status === 404) {
    return {
      notFound: true,
    };
  }
  const post: Post = await res.json();

  return {
    props: { post },
  };
};

const PostPage: NextPage<PageProps> = (props) => {
  const { post } = props;
  return (
    <div
      className="justify-start 
max-w-3xl mx-auto group hover:no-underline focus:no-underline  relative overflow-hidden object-cover flex flex-col  "
    >
      <div className="relative min-h-[288px] w-full object-contain">
        <Image
          priority
          data-cy-testid="post-image"
          className=" rounded-b-none h-72 object-cover"
          src={post?.imageUrl ?? ""}
          alt={`blog post image - ${post?.title}`}
          fill
          sizes="100vw"
        />
      </div>
      <div className=" pt-6 space-y-3">
        <div className="flex space-x-6 text-indigo-500 text-sm">
          {post?.categories?.map((category) => (
            <div key={category} data-cy-testid="post-category">
              {category}
            </div>
          ))}
        </div>
        <h3
          className="text-2xl font-semibold tracking-wide line-clamp-2 "
          data-cy-testid="post-title"
        >
          {post?.title}
        </h3>
        <p
          className="text-slate-500 line-clamp-3"
          data-cy-testid="post-excerpt"
        >
          {post?.excerpt}
        </p>
      </div>
      <div className="py-6 mb-6  flex space-x-2 text-sm mt-auto ">
        <div className="rounded-full w-10 h-10 bg-slate-400 "></div>
        <div className="flex flex-col">
          <div className="font-semibold"> Author name</div>
          <div className="text-slate-500">
            <span>Mar 10, 2020</span>
            <span> · 5 min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
