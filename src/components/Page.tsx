import * as React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";

export default function Page(props: { children: any }) {
  const data = useStaticQuery(query);
  return (
    <>
      <Helmet title={data.site.siteMetadata.title} />
      <div className="w-full bg-gray-300 min-h-full h-full overflow-auto pb-4 flex flex-col items-stretch">
        <div className="max-w-screen-lg m-auto flex-1 w-full">
          <div className="my-6 px-2">
            <Nav />
          </div>
          <div className="lg:mx-4 lg:mt-2">{props.children}</div>
        </div>
        <div className="max-w-screen-lg m-auto py-4 w-full">
          <hr />
          <Footer />
        </div>
      </div>
    </>
  );
}

const query = graphql`
  query QueryTitle {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
