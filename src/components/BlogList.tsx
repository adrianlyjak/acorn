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
            <div className="mb-4 flex-auto overflow-hidden relative leading-loose tracking-tighter line-clamp-5 text-justify pr-4">
              {blog.excerpt}
            </div>
          </>
        );
        const imageUrl = blog.frontmatter.featuredimage?.publicURL;
        return (
          <div key={i}>
            <Link to={"/" + blog.fields.slug}>
              <div className="flex flex-col md:flex-row items-stretch bg-white max-w-full shadow mb-6 overflow-hidden">
                {!imageUrl ? (
                  <div className="p-4 max-h-full pb-4 overflow-hidden flex flex-col h-64">
                    {textElement}
                  </div>
                ) : (
                  <>
                    <div className="md:w-1/3 p-4 bg-white md:h-64">
                      <div className="blog-img-crop-square">
                        <img src={imageUrl} />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-4 max-h-full md:border-l border-t md:border-t-0 flex flex-col h-64">
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
