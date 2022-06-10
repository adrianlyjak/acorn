import * as React from "react";
import "./MarkdownPost.css";

export default function MarkdownPost(props: { post: string }) {
  return (
    <div
      className="markdown-post prose md:prose-lg prose-p:text-justify prose-a:text-secondary-500 prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: props.post }}
    ></div>
  );
}
