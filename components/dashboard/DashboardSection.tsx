export default function DashboardSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="space-y-2 px-6 py-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </section>
  );
}
