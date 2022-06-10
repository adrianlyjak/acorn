import { Link } from "gatsby";
import * as React from "react";
import SnazzNavButton from "./SnazzNavButton";
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
            <div className="inline-block bg-primary-300 h-12 w-12 rounded-full" />
            <div className="inline-block bg-neutral-600 h-3 w-3 rounded-full ml-2 mb-1" />
            <div className="inline-block bg-neutral-600 h-3 w-3 rounded-full ml-4 mb-1" />
            <div className="inline-block bg-neutral-600 h-3 w-3 rounded-full ml-4 mb-1" />
          </div>
        </Link>
      </div>
      <div className="flex flex-row p-4">
        {pages.map(({ label, to }) => {
          return (
            <Link key={to} to={to} activeClassName="active group">
              <SnazzNavButton className="text-center whitespace-no-wrap">
                {label}
              </SnazzNavButton>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
