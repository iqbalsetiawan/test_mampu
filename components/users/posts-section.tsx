'use client'

import { useState } from 'react'
import type { Post } from '@/lib/types'

interface PostsSectionProps {
  posts: Post[]
}

const INITIAL_VISIBLE = 3

function PostItem({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <li className="px-5 py-3.5">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1"
        aria-expanded={expanded}
      >
        <p
          className={`mb-1 text-sm font-medium capitalize leading-snug text-zinc-800 dark:text-zinc-200 ${expanded ? '' : 'line-clamp-1'}`}
        >
          {post.title}
        </p>
        <p
          className={`text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 ${expanded ? '' : 'line-clamp-2'}`}
        >
          {post.body}
        </p>
      </button>
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-2 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Collapse
        </button>
      )}
    </li>
  )
}

export function PostsSection({ posts }: PostsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const visible = isExpanded ? posts : posts.slice(0, INITIAL_VISIBLE)
  const hasMore = posts.length > INITIAL_VISIBLE

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-700">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          Posts
        </h2>
        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200/50 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-800/50">
          {posts.length}
        </span>
      </div>

      {posts.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
          No posts yet.
        </p>
      ) : (
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-800/60" role="list">
          {visible.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      )}

      {hasMore && (
        <div className="border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {isExpanded ? 'Show less' : `Show all ${posts.length} posts`}
          </button>
        </div>
      )}
    </div>
  )
}
