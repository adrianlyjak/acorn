import { Link } from "gatsby";
import * as React from "react";
import useSiteTitle from "./useSiteTitle";

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

function Dot({
  size = 3,
  color = "warmgray-500",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-block rounded bg-${color} h-${size} w-${size} rounded-full ${className}`}
    />
  );
}

export default function Nav(props: {}) {
  const title = useSiteTitle();
  return (
    <div className="flex flex-row justify-between">
      <div className="flex-1 flex flex-row items-stretch">
        <Link to="/">
          <div className="">
            <Dot size={12} color="terracotta-500"></Dot>
            <Dot className="ml-2 mb-1"></Dot>
            <Dot className="ml-4 mb-1"></Dot>
            <Dot className="ml-4 mb-1"></Dot>
          </div>
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
