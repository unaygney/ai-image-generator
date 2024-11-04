import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import React from 'react'

import SearchBar from '@/components/search-bar'

import { getPrompts } from './actions'
import Prompts from './promts'

export default async function FeedPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPrompts,
  })

  return (
    <div className="flex h-full w-full flex-col gap-10">
      <SearchBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Prompts />
      </HydrationBoundary>
    </div>
  )
}
