import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery !== undefined) {
      setSearch(searchQuery || "");
    }
  }, [searchParams]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="mb-3 w-full xl:w-96">
        <form
          className="input-group relative flex items-stretch w-full mb-4 px-2"
          onSubmit={(e) => {
            e.preventDefault();
            const searchQuery = new URLSearchParams(window.location.search);
            searchQuery.delete("page");
            searchQuery.set("search", search);
            router.push("/?" + searchQuery.toString());
          }}
        >
          <input
            data-cy-testid="search"
            name="search"
            type="search"
            className="form-control relative flex-auto min-w-0 block w-full px-4 py-2 text-sm  rounded-md border border-gray-300 bg-white   text-gray-700 shadow-sm
             hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-gray-100"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon3"
            onChange={handleChange}
            value={search}
          ></input>
          <button type="submit" title="search">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              className="w-5 mx-2 cursor-pointer"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
