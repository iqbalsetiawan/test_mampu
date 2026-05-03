'use client'

import { startTransition, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark' | 'device'

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('device')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark' || stored === 'device') {
      startTransition(() => setMode(stored))
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    function applyTheme(nextMode: ThemeMode) {
      const isDark = nextMode === 'dark' || (nextMode === 'device' && mediaQuery.matches)
      root.classList.toggle('dark', isDark)
    }

    function handleDeviceThemeChange() {
      if (mode === 'device') applyTheme('device')
    }

    applyTheme(mode)
    mediaQuery.addEventListener('change', handleDeviceThemeChange)
    return () => mediaQuery.removeEventListener('change', handleDeviceThemeChange)
  }, [mode])

  function setTheme(nextMode: ThemeMode) {
    setMode(nextMode)
    try {
      localStorage.setItem('theme', nextMode)
    } catch {}
  }

  return (
    <>
      <select
        value={mode}
        onChange={(e) => setTheme(e.target.value as ThemeMode)}
        aria-label="Appearance"
        className="sm:hidden rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="device">System</option>
      </select>

      <div
        role="group"
        aria-label="Appearance"
        className="hidden sm:inline-flex rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-700 dark:bg-zinc-900"
      >
        {(['light', 'dark', 'device'] as const).map((value) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              mode === value
                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            {value === 'light' ? 'Light' : value === 'dark' ? 'Dark' : 'System'}
          </button>
        ))}
      </div>
    </>
  )
}
