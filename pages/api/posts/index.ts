// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DB from "../../../db";
import { BlogAPIRes } from "../../../types";

const POSTS_PER_PAGE = 3;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogAPIRes>
) {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const offset = (page - 1) * POSTS_PER_PAGE;
  const categories = DB.categories;

  const categoryFilter = req.query.category
    ? categories.find((cat) => cat.slug == req.query.category)
    : null;

  // non-existing category
  if (req.query.category && !categoryFilter) {
    return res.status(404).json({
      posts: [],
      categories,
      pagination: {
        hasNext: false,
        hasPrev: false,
      },
    });
  }

  const searchQuery = req.query.search;
  const isEmptySearchQuery = !req.query.search?.length;

  let filteredPosts = [],
    countMatchingPosts = 0,
    hasNext = false;
  const shouldFilterCategory = categoryFilter?.id && categories.length;

  for (let i = 0; DB.posts.length > i; i++) {
    const post = DB.posts[i];
    if (
      (!shouldFilterCategory ||
        (post.categories as number[]).includes(categoryFilter.id)) &&
      (isEmptySearchQuery ||
        post.title
          .toLowerCase()
          .includes((searchQuery as string).toLowerCase()))
    ) {
      if (filteredPosts.length === POSTS_PER_PAGE) {
        hasNext = true;
        break;
      }
      if (
        countMatchingPosts >= offset &&
        filteredPosts.length < POSTS_PER_PAGE
      ) {
        filteredPosts.push({
          ...post,
          categories: post.categories.map(
            (category) =>
              categories.find((cat) => cat.id === category)?.name || ""
          ),
        });
      }
      // we use countMatchingPosts to not compute post objects when they are going to be offsetted
      countMatchingPosts = countMatchingPosts + 1;
    }
  }

  const hasPrev = offset > 0;

  if (filteredPosts.length === 0) {
    return res.status(200).json({
      posts: [],
      categories,
      pagination: {
        hasNext: false,
        hasPrev: false,
      },
    });
  }

  res.status(200).json({
    posts: filteredPosts,
    categories,
    pagination: {
      hasNext,
      hasPrev,
    },
  });
}
