import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Nav from "./Nav";
import useSiteTitle from "./useSiteTitle";
import "./Page.css";

// @ts-ignore
import favicon from "../../static/img/favicon.ico";

export default function Page(props: { children: any; pageType?: "stylized" }) {
  const title = useSiteTitle();
  const bg = props.pageType === "stylized" ? "bg-stylized" : "";
  return (
    <>
      <Helmet title={title}>
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="w-full min-h-full bg-sand-100 h-full overflow-auto flex flex-col items-stretch">
        <div className="flex flex-row items-stretch flex-1 w-full">
          <div className="flex-1 bg-sand-50 border-b-16 border-t-16 border-sand-200"></div>
          <div
            className={`bg-gray-50 lg:border-r-16 border-sage-300 max-w-screen-lg container m-w-auto ${bg} flex flex-row items-stretch`}
          >
            <div className="flex flex-row" style={{ maxWidth: "8rem" }}>
              <div className="bg-sand-200 lg:w-4 md:w-2 w-1 border-b-16 border-t-16 border-sand-400"></div>
              <div className="bg-sand-300 lg:w-4 md:w-2 w-1 border-b-16 border-t-16 border-sand-500"></div>
            </div>
            <div className="overflow-auto flex-1 border-t-16 border-b-16 border-sage-300">
              <div className="mb-3 mt-3 px-3">
                <Nav />
              </div>
              <div className="mx-3 lg:mx-6 lg:mt-2">{props.children}</div>
              <div className="max-w-screen-lg m-auto py-4 w-full">
                <Footer />
              </div>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
}
