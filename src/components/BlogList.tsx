import * as React from "react";
import { Link } from "gatsby";
import { BlogSummary } from "../data/BlogSummary";
import "./BlogList.css";
import Card from "./Card";

export default function BlogList(props: { blogs: BlogSummary[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {props.blogs.map((blog, i) => {
        const imageUrl = blog.frontmatter.featuredimage?.publicURL;
        return (
          <Link to={"/" + blog.fields.slug}>
            <Card className="h-full">
              <article>
                <div className="text-lg font-bold">
                  {blog.frontmatter.title}
                </div>
                <div className="text-mode-info text-sm">
                  {blog.frontmatter.date}
                </div>
                {imageUrl ? (
                  <div className="relative mt-2 pb-[50%] ">
                    <img
                      className="absolute h-full w-full object-cover rounded-md"
                      src={imageUrl}
                    />
                  </div>
                ) : (
                  <div className="flex-auto max-h-36 mt-2 leading-6 overflow-hidden relative overflow-ellipsis overflow-clip line-clamp-5 text-justify px-2">
                    {blog.excerpt}
                  </div>
                )}
              </article>
            </Card>
          </Link>
        );
        // const textElement = (
        //   <>
        //     <Link to={"/" + blog.fields.slug}>
        //       <div className="flex flex-row justify-between items-baseline hover:bg-sage-100 hover:underline px-2 py-1">
        //         <span className="text-lg font-bold">
        //           {blog.frontmatter.title}
        //         </span>
        //         <span className="font-info text-sand-800">
        //           {blog.frontmatter.date}
        //         </span>
        //       </div>
        //     </Link>
        //     <div className="flex-auto max-h-36 leading-6 overflow-hidden relative overflow-ellipsis overflow-clip line-clamp-5 text-justify px-2">
        //       {blog.excerpt}
        //     </div>
        //   </>
        // );
        // const imageUrl = blog.frontmatter.featuredimage?.publicURL;
        // return (
        //   <div key={i}>
        //     <div
        //       className={
        //         "flex flex-col items-stretch py-3 overflow-hidden " +
        //         "border-gray-300 border-solid border-t-2 " +
        //         (i === props.blogs.length - 1 ? "border-b-2 " : "")
        //       }
        //     >
        //       {!imageUrl ? (
        //         <div className="p-4 max-h-full pb-4 overflow-hidden flex flex-col ">
        //           {textElement}
        //         </div>
        //       ) : (
        //         <>
        //           <div className="p-4">
        //             <div className="blog-summary-img rounded-2xl overflow-hidden">
        //               <img src={imageUrl} />
        //             </div>
        //           </div>
        //           <div className="p-4 max-h-full flex flex-col h-64">
        //             {textElement}
        //           </div>
        //         </>
        //       )}
        //     </div>
        //   </div>
        // );
      })}
    </div>
  );
}
