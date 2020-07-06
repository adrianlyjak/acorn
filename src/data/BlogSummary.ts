import { graphql } from "gatsby";

export type BlogSummary = {
  fields: {
    slug: string;
  };
  frontmatter: {
    title?: string;
    date?: string;
    featuredimage?: {
      publicURL: string;
    };
  };
  excerpt?: string;
};

export type BlogSummaryNode = { node: BlogSummary };

export const query = graphql`
  fragment BlogSummary on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
      featuredimage {
        publicURL
      }
    }
    excerpt
  }
`;
