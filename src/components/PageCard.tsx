import * as React from "react";

export default function PageCard({ children }: { children?: React.ReactNode }) {
  return (
    <div className={`mb-16 overflow-auto sm:p-4 p-2 lg:p-8`}>{children}</div>
  );
}
