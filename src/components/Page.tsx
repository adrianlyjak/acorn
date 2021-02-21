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
      <div className="w-full min-h-full bg-neutral-100 h-full overflow-auto pb-4 flex flex-col items-stretch">
        <div className="flex flex-row items-stretch flex-1 w-full">
          <div className="flex-1 bg-neutral-50 border-b-16 border-t-16 border-neutral-200"></div>
          <div className=" flex flex-row flex-1" style={{ maxWidth: "8rem" }}>
            <div className="bg-neutral-100 border-b-16 border-t-16 border-neutral-300 flex-1"></div>
            <div className="bg-neutral-200 border-b-16 border-t-16 border-neutral-400 flex-1"></div>
            <div className="bg-neutral-300 border-b-16 border-t-16 border-neutral-500 flex-1"></div>
          </div>
          <div className="bg-neutral-50 lg:border-r-16 border-b-16 border-t-16 border-neutral-200 max-w-screen-lg m-auto">
            <div className="mb-3 mt-3 px-3">
              <Nav />
            </div>
            <div className="mx-3 lg:mx-6 lg:mt-2">{props.children}</div>
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="max-w-screen-lg m-auto py-4 w-full">
          <hr />
          <Footer />
        </div>
      </div>
    </>
  );
}
