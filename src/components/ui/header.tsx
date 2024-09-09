import { cn } from "@/lib/utils";
import React, { HtmlHTMLAttributes } from "react";

export interface HeaderProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "bg-white shadow-xl text-center p-5 text-lg z-50",
          className
        )}
        ref={ref}
        {...props}
      >
        <h1 className="font-semibold">Nutriscan</h1>
      </div>
    );
  }
);
Header.displayName = "Header";

export { Header };
