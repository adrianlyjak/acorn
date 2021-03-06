import * as React from "react";

export default function PageCard({
  children,
  className,
}: {
  children: React.ReactChildren | React.ReactChild;
  className?: string;
}) {
  return (
    <div
      className={
        "border-terracotta-300 border-dashed border-t-2 " +
        "mb-16 overflow-auto " +
        (className || "")
      }
    >
      {children}
    </div>
  );
}
