import * as React from "react";
import { ContentWrapper } from "../types/Post";
import { Page } from "astro";

export default function BlogPagination({
  page,
}: {
  // zero based
  page: Page<ContentWrapper<any>>;
}) {
  return (
    <div className="font-info w-full flex flex-row justify-center items-center">
      <MaybeLink to={page.url.prev}>←</MaybeLink>
      <span className="inline-block">page {page.currentPage}</span>
      <MaybeLink to={page.url.next}>→</MaybeLink>
    </div>
  );
}

function MaybeLink({
  to,
  children,
}: {
  to: string | undefined;
  children: any;
}) {
  const classes = "py-2 px-6 inline-block text-3xl";
  return to ? (
    <a className={`${classes} text-secondary-500`} href={to}>
      {children}
    </a>
  ) : (
    <span className={`${classes} text-tertiary-300 cursor-not-allowed`}>
      {children}
    </span>
  );
}
