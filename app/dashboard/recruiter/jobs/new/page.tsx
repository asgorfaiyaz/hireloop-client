"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Globe2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { JOB_TYPES, jobSchema, type JobFormValues } from "@/lib/schemas/job";

const controlClassName =
  "h-11 rounded-xl border-input bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30";
const selectClassName = `${controlClassName} w-full appearance-none pr-10 outline-none focus-visible:ring-2`;
const labelClassName = "text-sm font-normal text-foreground/85";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-base font-medium text-card-foreground">
      <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
      {children}
    </h2>
  );
}

function SelectChevron() {
  return (
    <ChevronDown
      className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      aria-hidden="true"
    />
  );
}

export default function NewRecruiterJobPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema) as never,
    defaultValues: {
      title: "",
      companyName: "",
      category: "",
      jobType: "Full-time",
      isRemote: false,
      location: "",
      deadline: "",
      frequency: "per month",
      responsibilities: "",
      qualifications: "",
    },
  });
  const isRemote = useWatch({ control, name: "isRemote" });

  const onSubmit = async (data: JobFormValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-[calc(100svh-2.5rem)] bg-background px-4 pb-12 text-foreground sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[1200px]"
      >
        <header className="flex flex-col gap-5 border-b border-border pb-6 pt-7 sm:flex-row sm:items-center sm:justify-between sm:pt-10">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-2 flex items-center gap-1 text-xs text-muted-foreground"
            >
              <Link
                className="transition-colors hover:text-foreground"
                href="/dashboard/recruiter/jobs"
              >
                Manage Jobs
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span className="text-primary" aria-current="page">
                Create New Listing
              </span>
            </nav>
            <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-[34px]">
              Post a New Job
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
          >
            Publish Job <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </header>

        <div className="space-y-5 pt-6">
          <section className="space-y-5 rounded-2xl border border-border bg-card p-5 text-card-foreground sm:p-6">
            <SectionHeading>1. Basic Information</SectionHeading>
            <div className="space-y-4">
              <Field>
                <FieldLabel htmlFor="title" className={labelClassName}>
                  Job Title <span className="text-primary">*</span>
                </FieldLabel>
                <Input
                  id="title"
                  placeholder="e.g. Frontend Developer"
                  aria-invalid={!!errors.title}
                  className={controlClassName}
                  {...register("title")}
                />
                <FieldError errors={[errors.title]} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="companyName" className={labelClassName}>
                    Company Name <span className="text-primary">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Building2
                      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="companyName"
                      placeholder="Your company"
                      aria-invalid={!!errors.companyName}
                      className={`${controlClassName} pl-10`}
                      {...register("companyName")}
                    />
                  </div>
                  <FieldError errors={[errors.companyName]} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="category" className={labelClassName}>
                    Job Category <span className="text-primary">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <select
                      id="category"
                      aria-invalid={!!errors.category}
                      className={selectClassName}
                      {...register("category")}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option>Engineering &amp; Tech</option>
                      <option>Design &amp; Creative</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                      <option>Finance</option>
                      <option>Human Resources</option>
                      <option>Customer Support</option>
                      <option>Other</option>
                    </select>
                    <SelectChevron />
                  </div>
                  <FieldError errors={[errors.category]} />
                </Field>
              </div>
              <Field>
                <FieldLabel className={labelClassName}>
                  Job Type <span className="text-primary">*</span>
                </FieldLabel>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {JOB_TYPES.map((jobType) => (
                    <label key={jobType} className="relative cursor-pointer">
                      <input
                        className="peer sr-only"
                        type="radio"
                        value={jobType}
                        {...register("jobType")}
                      />
                      <span className="flex h-11 items-center justify-center rounded-xl bg-muted px-3 text-sm text-muted-foreground transition-colors peer-checked:bg-accent peer-checked:text-accent-foreground peer-checked:ring-1 peer-checked:ring-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                        {jobType}
                      </span>
                    </label>
                  ))}
                </div>
                <FieldError errors={[errors.jobType]} />
              </Field>
            </div>
          </section>

          <section className="space-y-5 rounded-2xl border border-border bg-card p-5 text-card-foreground sm:p-6">
            <SectionHeading>
              2. Location, Compensation &amp; Timeline
            </SectionHeading>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-muted p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Globe2 className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-foreground">
                  Remote work allowed
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </span>
              </span>
              <input
                type="checkbox"
                className="peer sr-only"
                {...register("isRemote")}
              />
              <span
                aria-hidden="true"
                className="relative h-6 w-11 rounded-full bg-secondary transition-colors after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-primary-foreground after:transition-transform peer-checked:bg-primary peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <div className="flex items-center justify-between gap-2">
                  <FieldLabel htmlFor="location" className={labelClassName}>
                    Job Location{" "}
                    {!isRemote && <span className="text-primary">*</span>}
                  </FieldLabel>
                  <span className="text-xs text-muted-foreground">
                    {isRemote ? "Optional for remote roles" : "Required"}
                  </span>
                </div>
                <div className="relative">
                  <MapPin
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="location"
                    placeholder={isRemote ? "Optional" : "City, Country"}
                    aria-invalid={!!errors.location}
                    className={`${controlClassName} pl-10`}
                    {...register("location")}
                  />
                </div>
                <FieldError errors={[errors.location]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="deadline" className={labelClassName}>
                  Application Deadline{" "}
                  <span className="text-primary">*</span>
                </FieldLabel>
                <div className="relative">
                  <CalendarDays
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="deadline"
                    type="date"
                    aria-invalid={!!errors.deadline}
                    className={`${controlClassName} pl-10`}
                    {...register("deadline")}
                  />
                </div>
                <FieldError errors={[errors.deadline]} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="minSalary" className={labelClassName}>
                  Min Salary / Rate
                </FieldLabel>
                <div className="relative">
                  <CircleDollarSign
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="minSalary"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 25"
                    aria-invalid={!!errors.minSalary}
                    className={`${controlClassName} pl-10`}
                    {...register("minSalary", {
                      setValueAs: (value) =>
                        value === "" ? undefined : Number(value),
                    })}
                  />
                </div>
                <FieldError errors={[errors.minSalary]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="maxSalary" className={labelClassName}>
                  Max Salary / Rate
                </FieldLabel>
                <div className="relative">
                  <CircleDollarSign
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="maxSalary"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 40"
                    aria-invalid={!!errors.maxSalary}
                    className={`${controlClassName} pl-10`}
                    {...register("maxSalary", {
                      setValueAs: (value) =>
                        value === "" ? undefined : Number(value),
                    })}
                  />
                </div>
                <FieldError errors={[errors.maxSalary]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="frequency" className={labelClassName}>
                  Frequency
                </FieldLabel>
                <div className="relative">
                  <select
                    id="frequency"
                    className={selectClassName}
                    {...register("frequency")}
                  >
                    <option>per hour</option>
                    <option>per month</option>
                    <option>per year</option>
                  </select>
                  <SelectChevron />
                </div>
              </Field>
            </div>
          </section>

          <section className="space-y-5 rounded-2xl border border-border bg-card p-5 text-card-foreground sm:p-6">
            <SectionHeading>
              3. Responsibilities &amp; Requirements
            </SectionHeading>
            <Field>
              <FieldLabel htmlFor="responsibilities" className={labelClassName}>
                Key Responsibilities <span className="text-primary">*</span>
              </FieldLabel>
              <textarea
                id="responsibilities"
                rows={4}
                placeholder="Describe the key responsibilities for this role..."
                aria-invalid={!!errors.responsibilities}
                className="w-full resize-y rounded-xl border border-input bg-muted px-4 py-3 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-[invalid=true]:border-destructive"
                {...register("responsibilities")}
              />
              <FieldError errors={[errors.responsibilities]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="qualifications" className={labelClassName}>
                Qualifications &amp; Requirements{" "}
                <span className="text-primary">*</span>
              </FieldLabel>
              <textarea
                id="qualifications"
                rows={4}
                placeholder="List the experience, skills, and qualifications candidates need..."
                aria-invalid={!!errors.qualifications}
                className="w-full resize-y rounded-xl border border-input bg-muted px-4 py-3 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-[invalid=true]:border-destructive"
                {...register("qualifications")}
              />
              <FieldError errors={[errors.qualifications]} />
            </Field>
          </section>
        </div>
      </form>
    </div>
  );
}
