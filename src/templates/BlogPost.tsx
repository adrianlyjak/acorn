import * as React from "react";
import { graphql } from "gatsby";
import Page from "../components/Page";
import "./BlogPost.css";

export default function BlogPost(props: { data: any; pageResources: any }) {
  const post = props.pageResources.json.data.markdownRemark;
  return (
    <Page>
      <article>
        <h1>{post.frontmatter.title}</h1>
        <div className="text-sm leading-loose">{post.frontmatter.date}</div>
        <div className="my-4 border-b border-gray-300 w-full"></div>
        <div
          className="blog-post"
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></div>
      </article>
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
