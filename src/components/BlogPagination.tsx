import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

export default function BlogPagination({
  pageIndex,
  pageSize,
}: {
  // zero based
  pageIndex: number;
  // size of a page
  pageSize: number;
}) {
  const previous = pageIndex > 0;
  const data = useStaticQuery(allblogs);
  const total = data.allMarkdownRemark.edges.length;
  const totalPages = Math.ceil(total / pageSize);
  const complete = pageIndex + 1 >= totalPages;
  const next = !complete;
  return (
    <div className="font-info w-full flex flex-row justify-center items-center">
      <Link
        className={`py-2 px-6 inline-block text-3xl ${
          previous ? "text-primary-500" : ""
        }`}
        to={previous ? `/posts/${pageIndex - 1}` : undefined}
      >
        ←
      </Link>
      <span className="inline-block">page {pageIndex + 1}</span>
      <Link
        className={`py-2 px-6 inline-block text-3xl ${
          next ? "text-primary-500" : ""
        }`}
        to={next ? `/posts/${pageIndex + 1}` : undefined}
      >
        →
      </Link>
    </div>
  );
}

const allblogs = graphql`
  query AllBlogs {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`;
