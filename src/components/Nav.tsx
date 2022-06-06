import { Link } from "gatsby";
import * as React from "react";
import useSiteTitle from "./useSiteTitle";

const pages: { label: string; to: string }[] = [
  {
    label: "Example",
    to: "/p/markdown/",
  },
  {
    label: "Construction",
    to: "/construction/",
  },
  {
    label: "Palette",
    to: "/palette/",
  },
];

export default function Nav(props: {}) {
  const title = useSiteTitle();
  return (
    <div className="flex flex-row justify-between">
      <div className="flex-1 flex flex-row items-stretch">
        <Link to="/">
          <div className=" overflow-hidden whitespace-nowrap">
            <div className="inline-block bg-terracotta-300 h-12 w-12 rounded-full" />
            <div className="inline-block bg-gray-600 h-3 w-3 rounded-full ml-2 mb-1" />
            <div className="inline-block bg-gray-600 h-3 w-3 rounded-full ml-4 mb-1" />
            <div className="inline-block bg-gray-600 h-3 w-3 rounded-full ml-4 mb-1" />
          </div>
        </Link>
      </div>
      <div className="flex flex-row">
        {pages.map(({ label, to }) => {
          return (
            <Link
              key={to}
              className="text-center text-sand-600 hover:text-sand-800 flex-1 p-2 font-info uppercase text-sm tracking-widest whitespace-no-wrap"
              activeClassName="text-sand-800"
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
