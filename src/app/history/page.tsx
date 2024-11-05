import { eq } from 'drizzle-orm'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

import { Promt } from '@/lib/definitions'
import { createClient } from '@/lib/supabase/server'
import { cn, formatDate, getAspectRatio } from '@/lib/utils'

import { db } from '@/db'
import { promptsTable } from '@/db/schema'

export default async function HistoryPage() {
  const supabase = await createClient()

  const { data: user } = await supabase.auth.getUser()

  if (!user || !user.user?.id) {
    redirect('/')
  }

  const prompts = await db
    .select()
    .from(promptsTable)
    .where(eq(promptsTable.user_id, user.user?.id))

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold tracking-[-0.7px] text-[#e4e4e7]">
        Genaration History
      </h1>
      <div className="flex flex-col space-y-[40px] divide-y">
        {prompts.map((promt, idx) => (
          <PromtContainer key={promt.id} promt={promt} idx={idx} />
        ))}
      </div>
    </div>
  )
}

function PromtContainer({ promt, idx }: { promt: Promt; idx: number }) {
  return (
    <div
      className={cn('flex flex-col gap-10 md:flex-row', {
        'pt-10': idx !== 0,
      })}
    >
      <div
        className="relative min-h-[190px] w-full rounded-lg border-4 border-[#212936] lg:max-w-[327px]"
        style={{
          height: promt.height! / 2.5,
        }}
      >
        <Image
          src={promt.image_url}
          alt={promt.promt}
          fill
          className="rounded-[4px] object-cover"
        />
      </div>
      <div className="w-full lg:flex-1">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold tracking-[-0.42px] text-[#6c727f]">
              Promp details
            </h3>
            <p className="text-base font-normal tracking-[-0.56px] text-[#e4e4e7]">
              {promt.promt}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold tracking-[-0.42px] text-[#6c727f]">
              Negative prompt
            </h3>
            <p className="text-base font-normal tracking-[-0.56px] text-[#e4e4e7]">
              {promt.negative_promt ? promt.negative_promt : 'Null'}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold tracking-[-0.42px] text-[#6c727f]">
              Created on
            </h3>
            <p className="text-base font-normal tracking-[-0.56px] text-[#e4e4e7]">
              {formatDate(promt.created_at)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold tracking-[-0.42px] text-[#6c727f]">
              Input Resolution
            </h3>
            <p className="text-base font-normal tracking-[-0.56px] text-[#e4e4e7]">
              {promt.width} x {promt.height} (
              {getAspectRatio(promt.width!, promt.height!)})
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold tracking-[-0.42px] text-[#6c727f]">
              Seed
            </h3>
            <p className="text-base font-normal tracking-[-0.56px] text-[#e4e4e7]">
              {promt.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
