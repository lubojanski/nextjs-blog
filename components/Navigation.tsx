import Link from "next/link";

const Navigation = () => (
  <nav className="bg-white border-gray-500 shadow-sm px-2 sm:px-4 py-5 rounded ">
    <div className="container flex flex-wrap justify-between items-center mx-auto">
      <Link href="/" className="flex items-center">
        <span className="self-center text-xl font-semibold whitespace-nowrap ">
          A Blog.
        </span>
      </Link>
    </div>
  </nav>
);

export default Navigation;
