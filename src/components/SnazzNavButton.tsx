import React, { MouseEventHandler } from "react";

export interface SnazzNavButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler | undefined;
  active?: boolean;
}

export default function SnazzNavButton({
  children,
  className,
  onClick,
}: SnazzNavButtonProps): React.ReactElement {
  return (
    <span
      className={`${className || ""} relative px-4 py-2 group overflow-clip`}
      onClick={onClick}
    >
      <span
        className={`absolute inset-0 duration-500 ease transition transform`}
      />
      <span className="absolute bottom-.5 left-0 w-[calc(100%-8px)] block duration-500">
        <span className="bg-gray-300 h-1 w-full block"></span>
      </span>
      <span
        className={`
      absolute bottom-.5 left-0 block
      w-0
      group-hover:w-[calc(100%-8px)] group-active-state:w-[calc(100%-8px)]
      duration-500`}
      >
        <span className="bg-secondary-300 h-1 w-full block"></span>
      </span>
      <span
        className={`
        absolute bottom-0 left-0 block
        w-full translate-x-0
        group-active-state:translate-x-[calc(100%-12px)] group-hover:translate-x-[calc(100%-12px)]
        duration-500
        `}
      >
        <span
          className={`
        bg-gray-300 border-primary-300
        group-hover:bg-primary-500 group-hover:border-primary-100 group-hover:rotate-[1440deg]
        group-active-state:border-0 group-active-state:bg-secondary-400
        w-2 h-2 rounded-full border-t-4 
        block
        duration-500 ease transition 
        `}
        ></span>
      </span>
      <span
        className={`
        text-sm 
        relative 
        transition transform ease
        group-hover:text-secondary-500 group-active-state:text-secondary-500
        `}
      >
        {children}
      </span>
    </span>
  );
}
