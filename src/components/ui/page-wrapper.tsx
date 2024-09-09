import { cn } from "@/lib/utils";
import React, { HtmlHTMLAttributes } from "react";

export interface MainProps extends HtmlHTMLAttributes<HTMLElement> {}

const Main = React.forwardRef<HTMLElement, MainProps>(
  ({ className, ...props }, ref) => {
    return (
      <main
        className={cn("max-w-[480px] mx-auto min-h-svh bg-white", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Main.displayName = "Main";

export { Main };
