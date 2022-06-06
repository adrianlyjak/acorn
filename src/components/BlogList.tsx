import * as React from "react";
import { Link } from "gatsby";
import { BlogSummary } from "../data/BlogSummary";
import "./BlogList.css";

export default function BlogList(props: { blogs: BlogSummary[] }) {
  return (
    <div>
      {props.blogs.map((blog, i) => {
        const textElement = (
          <>
            <Link to={"/" + blog.fields.slug}>
              <div className="flex flex-row justify-between items-baseline hover:bg-sage-100 hover:underline px-2 py-1">
                <span className="text-lg font-bold">
                  {blog.frontmatter.title}
                </span>
                <span className="font-info text-sand-800">
                  {blog.frontmatter.date}
                </span>
              </div>
            </Link>
            {/* <hr /> */}
            <div className="flex-auto max-h-36 leading-6 overflow-hidden relative overflow-ellipsis overflow-clip line-clamp-5 text-justify px-2">
              {blog.excerpt}
            </div>
          </>
        );
        const imageUrl = blog.frontmatter.featuredimage?.publicURL;
        return (
          <div key={i}>
            <div
              className={
                "flex flex-col md:flex-row items-stretch py-3 overflow-hidden " +
                "border-gray-300 border-solid border-t-2 " +
                (i === props.blogs.length - 1 ? "border-b-2 " : "")
              }
            >
              {!imageUrl ? (
                <div className="p-4 max-h-full pb-4 overflow-hidden flex flex-col ">
                  {textElement}
                </div>
              ) : (
                <>
                  <div className="md:w-1/3 p-4 md:h-64">
                    <div className="blog-img-crop-square rounded-2xl overflow-hidden">
                      <img src={imageUrl} />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-4 max-h-full flex flex-col h-64">
                    {textElement}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
