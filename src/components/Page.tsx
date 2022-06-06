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
      <div className="w-full min-h-full bg-tertiary-50 h-full overflow-auto flex flex-col items-stretch">
        <div className="flex flex-row items-stretch flex-1 w-full">
          <div className="flex-1 "></div>
          <div
            className={`bg-tertiary-300 max-w-screen-xl container m-w-auto flex flex-row items-stretch`}
          >
            <div className="flex flex-row">
              <div className="bg-tertiary-100 lg:w-4 md:w-2 border-b-16 border-t-16 border-tertiary-50"></div>
              <div className="bg-tertiary-200 lg:w-4 md:w-2 border-b-16 border-t-16 border-tertiary-100"></div>
            </div>
            <div className="overflow-auto flex-1 border-t-16 border-b-16 border-tertiary-200">
              <div className="mb-3 mt-3 px-3">
                <Nav />
              </div>
              <div className="md:mx-3 lg:mx-6 lg:mt-2">{props.children}</div>
              <div className="max-w-screen-lg m-auto py-4 w-full">
                <Footer />
              </div>
            </div>
            <div className="flex flex-row">
              <div className="bg-tertiary-200 lg:w-4 md:w-2 border-b-16 border-t-16 border-tertiary-100"></div>
              <div className="bg-tertiary-100 lg:w-4 md:w-2 border-b-16 border-t-16 border-tertiary-50"></div>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
}
