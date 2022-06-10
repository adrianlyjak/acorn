import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Nav from "./Nav";
import useSiteTitle from "./useSiteTitle";

// @ts-ignore
import favicon from "../../static/img/favicon.ico";
import "./Page.css";

export default function Page(props: { pageType?: "stylized"; children: any }) {
  const title = useSiteTitle();
  const bg = props.pageType === "stylized" ? "bg-stylized" : "bg-gray-50";

  return (
    <>
      <Helmet title={title}>
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="w-full min-h-full bg-tertiary-50 flex flex-row items-stretch selection:bg-secondary-400 text-gray-900 font-body">
        <div className="flex-1 "></div>
        <div
          className={`max-w-screen-lg container m-w-auto flex flex-row items-stretch`}
        >
          <div className="flex flex-row">
            <div className="bg-tertiary-100 lg:w-4 md:w-2 lg:border-y-16 md:border-y-8 border-tertiary-50 lg:my-[48px] md:my-[24px]"></div>
            <div className="bg-tertiary-200 lg:w-4 md:w-2 lg:border-y-16 md:border-y-8 border-tertiary-100 lg:my-[32px] md:my-[16px]"></div>
            <div className="bg-tertiary-300 lg:w-4 md:w-2 lg:border-y-16 md:border-y-8 border-tertiary-200 lg:my-[16px] md:my-[8px]"></div>
          </div>
          <div
            className={`flex-1 shadow-lg shadow-tertiary-700 border-gray-300 border-x z-10 ${bg}`}
          >
            <div className="border-b border-gray-200 sticky top-0 left-0 z-50 bg-gray-50 overflow-x-hidden">
              <div className="overflow-auto max-w-[100vw] p-3 ">
                <Nav />
              </div>
            </div>
            <div className="md:mx-3 lg:mx-6 lg:mt-2 overflow-auto ">
              {props.children}
            </div>
            <div className="max-w-screen-lg m-auto py-4 w-full">
              <Footer />
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <div className="bg-tertiary-100 lg:w-4 md:w-2 lg:border-y-16 md:border-y-8 border-tertiary-50 lg:my-[48px] md:my-[24px]"></div>
            <div className="bg-tertiary-200 lg:w-4 md:w-2 lg:border-y-16 md:border-y-8 border-tertiary-100 lg:my-[32px] md:my-[16px]"></div>
            <div className="bg-tertiary-300 lg:w-4 md:w-2 lg:border-y-16 md:border-y-8 border-tertiary-200 lg:my-[16px] md:my-[8px]"></div>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
}
