'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import { useDebounce } from 'use-debounce'

import { Loader, SearchIcon } from './icons'
import { Input } from './ui/input'

export default function SearchBar() {
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const router = useRouter()

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(window.location.search)

      if (debouncedSearch) {
        params.set('search', debouncedSearch)
      } else {
        params.delete('search')
      }

      router.push(`?${params.toString()}`, { scroll: false })
    })
  }, [debouncedSearch, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className="relative h-12 w-full max-w-[513px]">
      <Input
        placeholder="Search images by keywords"
        className="h-full"
        value={search}
        onChange={handleChange}
      />

      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {search !== debouncedSearch || isPending ? (
          <Loader className="h-6 w-6 animate-spin" />
        ) : (
          <SearchIcon className="h-6 w-6 cursor-pointer" />
        )}
      </div>
    </div>
  )
}
