"use client";

import * as React from "react";
import { Menu } from "@base-ui/react/menu";

import { cn } from "@/lib/utils";

const DropdownMenu = Menu.Root;
const DropdownMenuTrigger = Menu.Trigger;

function DropdownMenuContent({ className, ...props }: React.ComponentProps<typeof Menu.Popup>) {
  return (
    <Menu.Portal>
      <Menu.Positioner sideOffset={8} align="end" className="z-50 outline-none">
        <Menu.Popup
          className={cn(
            "min-w-56 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-lg outline-none",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 transition-[transform,opacity]",
            className,
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  );
}

function DropdownMenuItem({ className, ...props }: React.ComponentProps<typeof Menu.Item>) {
  return (
    <Menu.Item
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-lg px-2.5 py-2 text-sm outline-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof Menu.Separator>) {
  return <Menu.Separator className={cn("-mx-1.5 my-1.5 h-px bg-border", className)} {...props} />;
}

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger };

