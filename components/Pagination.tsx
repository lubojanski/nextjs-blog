import Link from "next/link";
import { Pagination } from "../types";

const Pagination = ({
  searchParams,
  pagination,
}: {
  searchParams: { page: string; search: string };
  pagination: Pagination | undefined;
}) => {
  return (
    <div className="flex justify-center mt-6 space-x-4">
      <Link
        className={!pagination?.hasPrev ? "disabled " : ""}
        href={{
          pathname: "/",
          query: {
            ...searchParams,
            page: searchParams.page
              ? parseInt(searchParams.page) - 1
              : undefined,
          },
        }}
      >
        <button
          data-cy-testid="prev"
          disabled={!pagination?.hasPrev}
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:pointer-events-none"
        >
          Prev
        </button>
      </Link>
      <Link
        className={!pagination?.hasNext ? "disabled" : ""}
        href={{
          pathname: "/",
          query: {
            ...searchParams,
            page: searchParams.page ? parseInt(searchParams.page) + 1 : 2,
          },
        }}
      >
        <button
          data-cy-testid="next"
          disabled={!pagination?.hasNext}
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:pointer-events-none"
        >
          Next
        </button>
      </Link>
    </div>
  );
};

export default Pagination;
