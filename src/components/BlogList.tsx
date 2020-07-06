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
            <div className="flex flex-row justify-between items-baseline mb-2">
              <span className="text-lg">{blog.frontmatter.title}</span>
              <span className="font-info text-gray-600">
                {blog.frontmatter.date}
              </span>
            </div>
            <hr />
            <div className="mb-4">{blog.excerpt}</div>
          </>
        );
        const imageUrl = blog.frontmatter.featuredimage?.publicURL;
        return (
          <div key={i}>
            <Link to={"/" + blog.fields.slug}>
              <div className="flex flex-col sm:flex-row items-stretch bg-gray-100 max-w-full shadow mb-6">
                {!imageUrl ? (
                  <div className="p-4">{textElement}</div>
                ) : (
                  <>
                    <div className="md:w-1/4 sm:w-1/3 p-4 bg-white">
                      <div className="blog-img-crop-square">
                        <img src={imageUrl} />
                      </div>
                    </div>
                    <div className="md:w-3/4 sm:w-2/3 p-4 md:border-l border-t md:border-t-0">
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
