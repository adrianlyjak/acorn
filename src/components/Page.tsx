import * as React from "react";
import { graphql, StaticQuery } from "gatsby";

export default function Page(props: { children: any }) {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        return (
          <div className=" w-full bg-gray-200">
            <div className="max-w-screen-lg px-1 bg-white lg:m-auto  lg:px-5">
              {props.children}
            </div>
          </div>
        );
      }}
    />
  );
}

export const query = graphql`
  query AllSitePageQuery {
    allSitePage {
      edges {
        node {
          id
        }
      }
    }
  }
`;
