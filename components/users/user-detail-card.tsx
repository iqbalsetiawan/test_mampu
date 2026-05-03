import type { User } from '@/lib/types'

interface UserDetailCardProps {
  user: User
}

function InfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="truncate text-sm text-indigo-600 transition-colors hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {value}
        </a>
      ) : (
        <span className="truncate text-sm text-zinc-700 dark:text-zinc-300">{value}</span>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-700">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          {title}
        </h2>
      </div>
      <div className="divide-y divide-zinc-100 px-5 py-1 dark:divide-zinc-800/60">{children}</div>
    </div>
  )
}

export function UserDetailCard({ user }: UserDetailCardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Section title="Contact">
        <InfoRow label="Name" value={user.name} />
        <InfoRow label="Username" value={`@${user.username}`} />
        <InfoRow label="Email" value={user.email.toLowerCase()} href={`mailto:${user.email}`} />
        <InfoRow label="Phone" value={user.phone} />
        <InfoRow label="Website" value={user.website} href={`https://${user.website}`} />
      </Section>

      <Section title="Company">
        <InfoRow label="Name" value={user.company.name} />
        <InfoRow label="Tagline" value={user.company.catchPhrase} />
        <InfoRow label="Focus" value={user.company.bs} />
      </Section>

      <div className="md:col-span-2">
        <Section title="Address">
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            <InfoRow label="Street" value={user.address.street} />
            <InfoRow label="Suite" value={user.address.suite} />
            <InfoRow label="City" value={user.address.city} />
            <InfoRow label="Zipcode" value={user.address.zipcode} />
          </div>
        </Section>
      </div>
    </div>
  )
}
