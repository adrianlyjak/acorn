import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

export default function BlogPagination({
  pageIndex,
}: {
  // zero based
  pageIndex: number;
}) {
  const previous = pageIndex > 0;
  const data = useStaticQuery(allblogs);
  const total = data.allMarkdownRemark.edges.length;
  const pageSize = data.site.siteMetadata.pageSize as number;
  const totalPages = Math.ceil(total / pageSize);
  const complete = pageIndex + 1 >= totalPages;
  const next = !complete;
  return (
    <div className="font-info w-full flex flex-row justify-center items-center">
      <Link
        className={`py-2 px-6 inline-block text-3xl ${
          previous ? "text-primary-500" : "text-gray-500"
        }`}
        to={previous ? `/posts/${pageIndex - 1}` : undefined}
      >
        ←
      </Link>
      <span className="inline-block">page {pageIndex + 1}</span>
      <Link
        className={`py-2 px-6 inline-block text-3xl ${
          next ? "text-primary-500" : "text-gray-500"
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
    site {
      siteMetadata {
        pageSize
      }
    }
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
