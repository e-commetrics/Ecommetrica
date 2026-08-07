/** Placeholder shown while PackagesConfigurator hydrates (it needs useSearchParams,
 * so static export can't prerender it) — kept close to the wizard's real dimensions
 * so hydration doesn't cause a layout jump. */
export default function ConfiguratorSkeleton() {
  return (
    <div className="mt-16 animate-pulse">
      <div className="flex gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 w-9 rounded-full bg-ecom-ink/10" />
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-80 rounded-3xl border border-ecom-ink/10 bg-ecom-ink/[0.03]" />
        ))}
      </div>
    </div>
  );
}
