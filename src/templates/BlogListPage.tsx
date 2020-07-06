import * as React from "react";
import { graphql } from "gatsby";
import Page from "../components/Page";
import { BlogSummaryNode } from "../data/BlogSummary";
import BlogPagination from "../components/BlogPagination";
import BlogList from "../components/BlogList";

export default function BlogListPage(props: any) {
  const blogs = (props.data.allMarkdownRemark.edges as BlogSummaryNode[]).map(
    (x) => x.node
  );
  const page = props.pathContext.page;
  return (
    <Page>
      <BlogList blogs={blogs} />
      <BlogPagination pageIndex={page} />
    </Page>
  );
}

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...BlogSummary
        }
      }
    }
  }
`;
