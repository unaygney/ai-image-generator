import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import React from 'react'

import SearchBar from '@/components/search-bar'

import { getBookmarks, getPrompts } from './actions'
import Prompts from './promts'

export default async function FeedPage() {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['posts'],
      queryFn: getPrompts,
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
        <Prompts />
      </HydrationBoundary>
    </div>
  )
}
