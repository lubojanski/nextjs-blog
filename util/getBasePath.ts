import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

// https://stackoverflow.com/questions/44342226/next-js-error-only-absolute-urls-are-supported
export const getBasePath = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  if (process.env.NODE_ENV === "production") {
    return `https://${context.req.rawHeaders[1]}`;
  } else {
    return "http://localhost:3000";
  }
};
