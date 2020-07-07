import * as React from "react";
import { graphql } from "gatsby";
import Page from "../components/Page";
import MarkdownPost from "../components/MarkdownPost";
import { Helmet } from "react-helmet";

export default function BlogPost(props: { data: any; pageResources: any }) {
  const post = props.data.markdownRemark;
  const pageTitle =
    props.data.site.siteMetadata.title + " - " + post.frontmatter.title;
  return (
    <Page>
      <Helmet title={pageTitle} />
      <div className="p-2 lg:p-8 bg-white shadow-md mb-16 overflow-auto">
        <article>
          <h1 className="m-0 mt-4 leading-snug">{post.frontmatter.title}</h1>
          <div className="text-sm text-mode-info mb-8">
            {post.frontmatter.date}
          </div>
          <MarkdownPost post={post.html} />
        </article>
      </div>
    </Page>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
