"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export function BrowseJobsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  function setSearchParam(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const search = value.trim();

    if (search) params.set("search", search);
    else params.delete("search");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  useEffect(() => {
    setValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  return (
    <div role="search" className="rounded-xl border border-border bg-card p-4">
      <div className="relative min-w-0 flex-1">
        <Search
          aria-hidden="true"
          className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          aria-label="Search jobs"
          autoComplete="off"
          placeholder="Search by job title, keywords..."
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setSearchParam(event.target.value);
          }}
          className="h-[58px] rounded-lg border-border bg-background pl-11 text-sm"
        />
      </div>
    </div>
  );
}

export function BrowseJobsSearchFallback() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <Skeleton className="h-[58px] w-full rounded-lg" />
    </div>
  );
}
