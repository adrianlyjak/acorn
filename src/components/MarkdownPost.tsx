import * as React from "react";
import "./MarkdownPost.css";

export default function MarkdownPost(props: { post: string }) {
  return (
    <div
      className="markdown-post"
      dangerouslySetInnerHTML={{ __html: props.post }}
    ></div>
  );
}
