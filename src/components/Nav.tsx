import * as React from "react";
import { Link } from "gatsby";

const pages: { label: string; to: string }[] = [
  // {
  //   label: "Example",
  //   to: "/p/markdown/",
  // },
  // {
  //   label: "About",
  //   to: "/about/",
  // },
];

export default function Nav(props: {}) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex-1 flex flex-row items-stretch">
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-800"
          activeClassName="text-gray-800"
        >
          <span className="font-info text-lg ">Homecraft: Life is Art</span>
        </Link>
      </div>
      <div className="flex flex-row">
        {pages.map(({ label, to }) => {
          return (
            <Link
              key={to}
              className="text-center text-gray-600 hover:text-gray-800 flex-1 p-2 font-info uppercase text-sm tracking-widest whitespace-no-wrap"
              activeClassName="text-gray-800"
              to={to}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
