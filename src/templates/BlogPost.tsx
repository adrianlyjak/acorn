import * as React from "react";
export default function BlogPost(props: { data: any }) {
  return <div>Hello I'm blog; {JSON.stringify(props.data)}</div>;
}
