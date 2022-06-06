import * as React from "react";

export default function Footer() {
  return (
    <div className="text-xs leading-tight text-center">
      <p className="text-center text-sand-700">
        Acorn theme made with{" "}
        <a
          href="https://www.gatsbyjs.org/"
          className="underline hover:text-sand-900"
          title="Gatsby"
        >
          Gatsby
        </a>
      </p>
    </div>
  );
}
