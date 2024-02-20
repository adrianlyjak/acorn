import * as React from "react";
import SnazzNavButton from "./SnazzNavButton";
import "../styles/typography.css";
import "../styles/index.css";

const pages: { label: string; to: string }[] = [
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Posts",
    to: "/page-1",
  },
];

export default function Nav(props: { activePath?: string }) {
  return (
    <div className="flex flex-row justify-between flex-nowrap">
      <div className="sm:p-2 p-1 pt-2">
        <a href="/">
          <Logo />
        </a>
      </div>
      <div className="flex flex-row sm:p-4 sm:pt-6 p-1">
        {pages.map(({ label, to }) => {
          return (
            <a
              key={to}
              href={to}
              className={
                to.replace(/\/$/g, "") === props.activePath?.replace(/\/$/g, "")
                  ? "active group"
                  : ""
              }
            >
              <SnazzNavButton className="text-center whitespace-no-wrap ml-1">
                {label}
              </SnazzNavButton>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function Logo() {
  const sizes = {
    xs: {
      bigCircle: "h-[1.5rem] w-[1.5rem]",
      dots: "h-[0.5rem] w-[0.5rem] ml-[0.25rem] mb-[0.125rem]",
    },
    sm: {
      bigCircle: "sm:h-[3rem] sm:w-[3rem]",
      dots: "sm:h-[0.75rem] sm:w-[0.75rem] sm:ml-[0.75rem] sm:mb-[0.25rem]",
    },
  };
  return (
    <div className=" overflow-hidden whitespace-nowrap">
      <div
        className={`inline-block bg-primary-300 rounded-full ${sizes.sm.bigCircle} ${sizes.xs.bigCircle}`}
      />
      <div
        className={`inline-block bg-neutral-600 rounded-full ${sizes.sm.dots} ${sizes.xs.dots}`}
      />
      <div
        className={`inline-block bg-neutral-600 rounded-full ${sizes.sm.dots} ${sizes.xs.dots}`}
      />
      <div
        className={`inline-block bg-neutral-600 rounded-full ${sizes.sm.dots} ${sizes.xs.dots}`}
      />
    </div>
  );
}
