import Image from "next/image";
import { BlogAPIRes, Post } from "../../types";

async function getPost(slug: string): Promise<Post | undefined> {
  try {
    const post = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/posts/${slug}`
    );
    return post.json();
  } catch (e) {
    console.log(e);
  }
}
/*async function getPosts(): Promise<BlogAPIRes> {
  const articles = await fetch(`${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/posts`);
  return articles.json();
}

 export async function generateStaticParams() {
  const { posts } = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
} */
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return (
    <div
      className="justify-start 
    max-w-3xl mx-auto group hover:no-underline focus:no-underline  relative overflow-hidden object-cover flex flex-col  "
    >
      <div className="relative min-h-[288px] w-full object-contain">
        <Image
          priority
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
            <div key={category}>{category}</div>
          ))}
        </div>
        <h3 className="text-2xl font-semibold tracking-wide line-clamp-2 ">
          {post?.title}
        </h3>
        <p className="text-slate-500 line-clamp-3">{post?.excerpt}</p>
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
}
