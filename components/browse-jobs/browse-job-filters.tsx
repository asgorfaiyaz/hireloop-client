"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const jobTypes = [
  { label: "Full-time", count: "1.2k" },
  { label: "Contract", count: "432" },
  { label: "Freelance", count: "156" },
];

function readSelectedJobTypes(params: URLSearchParams) {
  if (!params.has("jobType")) return ["Full-time"];
  return params.getAll("jobType").filter(Boolean);
}

export function BrowseJobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedJobTypes, setSelectedJobTypes] = useState(() =>
    readSelectedJobTypes(new URLSearchParams(searchParams.toString())),
  );

  useEffect(() => {
    setSelectedJobTypes(
      readSelectedJobTypes(new URLSearchParams(searchParams.toString())),
    );
  }, [searchParams]);

  function handleCheckboxChange(value: string, checked: boolean) {
    const nextSelection = checked
      ? [...selectedJobTypes, value]
      : selectedJobTypes.filter((jobType) => jobType !== value);

    setSelectedJobTypes(nextSelection);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("jobType");
    if (nextSelection.length === 0) {
      // Keep an explicit empty value so no filter remains selected.
      params.set("jobType", "");
    } else {
      nextSelection.forEach((jobType) => params.append("jobType", jobType));
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  return (
    <aside className="h-fit rounded-xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight">Filters</h2>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">Job Type</legend>
        <div className="mt-5 space-y-3">
          {jobTypes.map((jobType) => (
            <Label
              key={jobType.label}
              className="flex cursor-pointer items-center gap-3 text-sm font-normal text-muted-foreground"
            >
              <input
                type="checkbox"
                value={jobType.label}
                checked={selectedJobTypes.includes(jobType.label)}
                onChange={(event) =>
                  handleCheckboxChange(jobType.label, event.target.checked)
                }
                className="size-5 shrink-0 cursor-pointer accent-primary"
              />
              <span className="flex-1">{jobType.label}</span>
              <span className="text-xs tabular-nums">{jobType.count}</span>
            </Label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}

export function BrowseJobFiltersFallback() {
  return (
    <aside className="h-52 rounded-xl border border-border bg-card p-6">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="mt-8 h-4 w-28" />
      <div className="mt-5 space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </aside>
  );
}
