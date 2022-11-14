import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Category } from "../types";

const CategorySelector = ({
  categories,
}: {
  categories: Category[] | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | null>("Categories");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      setOpen(false);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("category");
    if (searchQuery) {
      setTitle(searchQuery.toUpperCase());
    } else {
      setTitle("Categories");
    }
  }, [searchParams]);

  const handleCategorySelect = (e: any, category?: Category) => {
    e.stopPropagation();
    const searchQuery = new URLSearchParams(window.location.search);

    if (!category) {
      searchQuery.delete("page");
      searchQuery.delete("category");
    } else {
      searchQuery.set("category", category.slug);
      searchQuery.delete("page");
    }
    router.push("?" + searchQuery.toString());
    setOpen(false);
  };

  return (
    <>
      <div className="relative inline-block text-left px-2 pb-4  ">
        <button
          data-cy-testid="category-select"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          type="button"
          className="inline-flex w-full sm:w-auto justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 
          focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-gray-100"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {title}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={` ${
            !open && "invisible"
          } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <div
              onClick={(e) => handleCategorySelect(e)}
              key={"all"}
              className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:bg-gray-50 "
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              All Categories
            </div>
            {categories?.map((category, i) => (
              <div
                onClick={(e) => handleCategorySelect(e, category)}
                key={category.id}
                className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:bg-gray-50 "
                role="menuitem"
                tabIndex={-1}
                data-cy-testid={"menu-item-" + i + 1}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySelector;
