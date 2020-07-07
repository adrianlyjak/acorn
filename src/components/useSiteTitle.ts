import { useStaticQuery, graphql } from "gatsby";

interface SiteTitleResult {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}
export const siteTitleQuery = graphql`
  query QueryTitle {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default function useSiteTitle(): string {
  return useStaticQuery<SiteTitleResult>(siteTitleQuery).site.siteMetadata
    .title;
}
