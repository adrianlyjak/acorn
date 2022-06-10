import React from "react";

export default function Card({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-auto p-2 lg:p-4 ${className || ""}`}>
      {children}
    </div>
  );
}
