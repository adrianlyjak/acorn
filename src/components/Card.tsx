import * as React from "react";

export default function Card({
  children,
  className,
}: {
  children: React.ReactChildren | React.ReactChild;
  className?: string;
}) {
  return (
    <div
      className={
        "border-terracotta-300 border-dashed border-t-2 border-b-2 " +
        "max-w-full overflow-auto " +
        (className || "")
      }
    >
      {children}
    </div>
  );
}
