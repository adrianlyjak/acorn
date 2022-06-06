import * as React from "react";
import "./PageCard.css";

export default function PageCard({
  pageType,
  children,
}: {
  pageType?: "stylized";
  children?: React.ReactNode;
}) {
  const bg = pageType === "stylized" ? "bg-stylized" : "";
  return (
    <div
      className={`bg-gray-50 shadow-xl md:rounded-md mb-16 overflow-auto sm:p-4 p-2 lg:p-8 ${bg}`}
    >
      {children}
    </div>
  );
}
