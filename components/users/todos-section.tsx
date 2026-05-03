'use client'

import { useState } from 'react'
import type { Todo } from '@/lib/types'

interface TodosSectionProps {
  todos: Todo[]
}

type Tab = 'pending' | 'completed'

export function TodosSection({ todos }: TodosSectionProps) {
  const [activeTab, setActiveTab] = useState<Tab>('pending')

  const completed = todos.filter((t) => t.completed)
  const pending = todos.filter((t) => !t.completed)
  const visible = activeTab === 'pending' ? pending : completed

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-700">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          Todos
        </h2>
        <div className="flex gap-1.5">
          <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200/50 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-800/50">
            {pending.length} pending
          </span>
          <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/50 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50">
            {completed.length} done
          </span>
        </div>
      </div>

      <div className="border-b border-zinc-100 px-5 py-2.5 dark:border-zinc-800">
        <div className="flex gap-0.5 rounded-lg bg-zinc-100 p-0.5 text-sm dark:bg-zinc-800">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              activeTab === 'pending'
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Pending ({pending.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              activeTab === 'completed'
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Completed ({completed.length})
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
          No {activeTab} todos.
        </p>
      ) : (
        <ul
          className="max-h-64 divide-y divide-zinc-100 overflow-y-auto [scrollbar-color:theme(colors.zinc.300)_transparent] dark:[scrollbar-color:theme(colors.zinc.600)_transparent] dark:divide-zinc-800/60"
          role="list"
        >
          {visible.map((todo) => (
            <li key={todo.id} className="flex items-start gap-3 px-5 py-3">
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  todo.completed
                    ? 'bg-emerald-100 dark:bg-emerald-900/50'
                    : 'bg-amber-100 dark:bg-amber-900/50'
                }`}
                aria-hidden="true"
              >
                {todo.completed && (
                  <svg
                    className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-sm capitalize leading-snug text-zinc-700 line-clamp-2 dark:text-zinc-300">
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
