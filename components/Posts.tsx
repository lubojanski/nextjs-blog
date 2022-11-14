import { Post as PostType } from "../types";
import Post from "./Post";

const Posts = ({ posts }: { posts: PostType[] | undefined }) => {
  return (
    <div
      className={`grid justify-center grid-cols-1 gap-6  lg:grid-cols-6 m-auto`}
    >
      {posts?.map((post, i) => (
        <div
          key={post.id}
          className={`lg:col-span-2 ${
            posts.length === 1 && "lg:col-start-3 "
          } ${posts.length === 2 && i == 0 && "lg:col-start-2 lg:col-end-4"} ${
            posts.length === 2 && i == 1 && "lg:col-start-4 lg:col-end-6"
          }
        `}
        >
          <Post
            key={post.id}
            imageUrl={post.imageUrl}
            title={post.title}
            excerpt={post.excerpt}
            categories={post.categories}
            slug={post.slug}
            postsDisplayed={posts.length}
          />
        </div>
      ))}
    </div>
  );
};

export default Posts;
