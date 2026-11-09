"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetClose = Dialog.Close;

const SheetContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Dialog.Popup>>(
  ({ className, children, ...props }, ref) => (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
      <Dialog.Viewport className="fixed inset-0 z-50 flex justify-end">
        <Dialog.Popup
          ref={ref}
          className={cn(
            "h-full w-[min(22rem,88vw)] border-l border-nav-border bg-nav-surface/95 p-6 text-nav-foreground shadow-2xl shadow-black/30 backdrop-blur-xl outline-none",
            "data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full transition-transform duration-200",
            className,
          )}
          {...props}
        >
          {children}
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  ),
);
SheetContent.displayName = "SheetContent";

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.ComponentProps<typeof Dialog.Title>>(
  ({ className, ...props }, ref) => (
    <Dialog.Title ref={ref} className={cn("text-base font-semibold", className)} {...props} />
  ),
);
SheetTitle.displayName = "SheetTitle";

export { Sheet, SheetClose, SheetContent, SheetTitle };
