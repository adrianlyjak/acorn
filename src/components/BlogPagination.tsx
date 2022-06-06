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
      <MaybeLink to={previous ? `/posts/${pageIndex - 1}` : undefined}>
        ←
      </MaybeLink>
      <span className="inline-block">page {pageIndex + 1}</span>
      <MaybeLink to={next ? `/posts/${pageIndex + 1}` : undefined}>→</MaybeLink>
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
    <Link className={`${classes} text-secondary-500`} to={to}>
      {children}
    </Link>
  ) : (
    <span className={`${classes} text-tertiary-300 cursor-not-allowed`}>
      {children}
    </span>
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
