import * as React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import Page from "../components/Page";
import BlogList from "../components/BlogList";
import BlogPagination from "../components/BlogPagination";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

export default class extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
  }
  public render() {
    return (
      <Page>
        <RecentBlogs />
      </Page>
    );
  }
}

function RecentBlogs() {
  const blogs: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: { slug: string };
          frontmatter: { title: string; date: string };
        };
      }[];
    };
  } = useStaticQuery(recentBlogs);

  return (
    <>
      <BlogList blogs={blogs.allMarkdownRemark.edges.map((x) => x.node)} />
      <BlogPagination pageIndex={0} pageSize={3} />
    </>
  );
}

const recentBlogs = graphql`
  query RecentBlogsQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          ...BlogSummary
        }
      }
    }
  }
`;
