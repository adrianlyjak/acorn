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
            <div className="flex flex-row justify-between items-baseline mb-5">
              <span className="text-lg">{blog.frontmatter.title}</span>
              <span className="font-info text-gray-600">
                {blog.frontmatter.date}
              </span>
            </div>
            {/* <hr /> */}
            <div className="flex-auto max-h-36 leading-7 overflow-hidden relative overflow-ellipsis overflow-clip line-clamp-5 text-justify pr-4">
              {blog.excerpt}
            </div>
          </>
        );
        const imageUrl = blog.frontmatter.featuredimage?.publicURL;
        return (
          <div key={i}>
            <Link to={"/" + blog.fields.slug}>
              <div
                className={
                  "flex flex-col md:flex-row items-stretch py-3 hover:bg-neutral-100 overflow-hidden " +
                  "border-terracotta-50 border-dashed border-t-2 " +
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
            </Link>
          </div>
        );
      })}
    </div>
  );
}
