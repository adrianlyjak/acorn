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
      className={`${
        className || ""
      } relative px-2 py-1 sm:px-4 sm:py-2 group overflow-clip inline-block`}
      onClick={onClick}
    >
      <span
        className={`absolute inset-0 duration-250 ease transition transform`}
      />
      {/* inactive dull underline bg */}
      <span
        className={`
        absolute block
        bottom-[0.125rem] right-0 mr-[0.25rem]
        w-[calc(100%-0.5rem)]
        bg-gray-300 h-[0.125rem]
        `}
      />
      {/* active underline bg */}
      <span
        className={`
      absolute block
      bottom-[0.125rem] left-0 ml-[0.25rem]
      w-0 h-[0.125rem]
      bg-secondary-300
      group-hover:w-[calc(100%-0.5rem)] group-active-state:w-[calc(100%-0.5rem)]
      duration-250
      `}
      />
      {/* rolling ball container */}
      <span
        className={`
        flex flex-row
        absolute block
        bottom-0 left-0 right-0
      `}
      >
        {/* rolling animation spacer */}
        <span
          className={`
         flex-grow-0
         group-hover:flex-grow group-active-state:flex-grow
         duration-250 ease transition-all
      `}
        />
        {/* rolling ball */}
        <span
          className={`
        duration-250 ease transition
        bg-primary-500 border-primary-200
        group-hover:bg-secondary-500 group-hover:border-secondary-200 group-hover:rotate-[1440deg]
        group-active-state:bg-secondary-500 group-active-state:border-secondary-200 group-active-state:rotate-[1440deg]
        w-[0.5rem] h-[0.5rem] rounded-full border-t-[0.25rem]
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
