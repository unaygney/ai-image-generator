import React from 'react'

import SearchBar from '@/components/search-bar'

export default async function FeedPage() {
  return (
    <div className="flex flex-col gap-10">
      <SearchBar />
      {/* {data.map((row) => (
        <div key={row.id}>
          <Image width={500} height={500} alt={row.promt} src={row.image_url} />
        </div>
      ))} */}
    </div>
  )
}
