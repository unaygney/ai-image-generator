import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import React from 'react'

import SearchBar from '@/components/search-bar'

import { getBookmarks, getPrompts } from './actions'
import Prompts from './promts'

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryClient = new QueryClient()

  const search = (await searchParams).search ?? ''
  const fetchPrompts = () =>
    getPrompts(Array.isArray(search) ? search.join(' ') : search)

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['posts', search],
      queryFn: fetchPrompts,
    }),
    queryClient.prefetchQuery({
      queryKey: ['bookmarks'],
      queryFn: getBookmarks,
    }),
  ])
  return (
    <div className="flex flex-col gap-10">
      <SearchBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Prompts search={search} />
      </HydrationBoundary>
    </div>
  )
}
