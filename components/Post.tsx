import Image from "next/image";
import Link from "next/link";
import { Post as PostType } from "../types";

const Post = (
  props: Partial<PostType> & { postsDisplayed: number; imageUrl: string }
) => {
  const imageUrl = props.imageUrl;
  return (
    <Link
      data-cy-testid="post"
      href={`/posts/${props.slug}`}
      className={` justify-start transform hover:translate-y-1 transition duration-200 ease-in-out h-[490px]
       max-w-sm mx-auto group hover:no-underline focus:no-underline shadow-lg rounded-xl relative overflow-hidden object-cover flex flex-col  `}
    >
      <div className="relative min-h-[180px] w-full object-contain">
        <Image
          priority
          className="z-0 rounded-xl rounded-b-none h-44 object-cover"
          src={imageUrl}
          alt={`blog post image `}
          fill
          sizes="(max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw"
        />
      </div>
      <div className="px-6 pt-6 space-y-3">
        <div className="flex space-x-6 text-indigo-500 text-sm">
          {props.categories?.map((category) => (
            <div key={category} data-cy-testid="post-category">
              {category}
            </div>
          ))}
        </div>
        <h3 className="text-2xl font-semibold tracking-wide line-clamp-2 ">
          {props.title}
        </h3>
        <p className="text-slate-500 line-clamp-3">{props.excerpt}</p>
      </div>
      <div className="px-6 mb-6  flex space-x-2 text-sm mt-auto ">
        <div className="rounded-full w-10 h-10 bg-slate-400 "></div>
        <div className="flex flex-col">
          {/* missing data from the DB */}
          <div className="font-semibold"> Author name</div>
          <div className="text-slate-500">
            <span>Mar 10, 2020</span>
            <span> · 5 min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
