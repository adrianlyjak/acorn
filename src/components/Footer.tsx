import * as React from "react";

export default function Footer() {
  return (
    <div className="text-xs leading-tight text-center">
      <p className="text-center text-tertiary-700">
        Acorn theme made with{" "}
        <a
          href="https://www.gatsbyjs.org/"
          className="underline hover:text-tertiary-900"
          title="Gatsby"
        >
          Gatsby
        </a>
      </p>
    </div>
  );
}
