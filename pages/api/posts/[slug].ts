// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DB from "../../../db";
import { Post } from "../../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | null>
) {
  const slug = req.query.slug;
  let post = slug ? DB.posts.find((post) => post.slug == slug) : null;

  if (!post) {
    return res.status(404).json(null);
  }
  const postWithCategoryNames = {
    ...post,
    categories: post.categories.map(
      (category) => DB.categories.find((cat) => cat.id === category)?.name || ""
    ),
  };

  res.status(200).json(postWithCategoryNames);
}
