import Image from 'next/image'
import React from 'react'

import { db } from '@/db'
import { promptsTable } from '@/db/schema'

export default async function FeedPage() {
  const data = await db.select().from(promptsTable)
  return (
    <div>
      {data.map((row) => (
        <div key={row.id}>
          <Image width={500} height={500} alt={row.promt} src={row.image_url} />
        </div>
      ))}
    </div>
  )
}
