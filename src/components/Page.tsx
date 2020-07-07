import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Nav from "./Nav";
import useSiteTitle from "./useSiteTitle";

// @ts-ignore
import favicon from "../../static/img/favicon.ico";

export default function Page(props: { children: any }) {
  const title = useSiteTitle();
  return (
    <>
      <Helmet title={title}>
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="w-full bg-gray-200 min-h-full h-full overflow-auto pb-4 flex flex-col items-stretch">
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
