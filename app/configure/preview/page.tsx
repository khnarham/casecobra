import { db } from '@/DB'
import { notFound } from 'next/navigation'
import React from 'react'
import DesignPreview from './DesignPreview'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const page: React.FC<PageProps> = async({searchParams}: PageProps) => {
  const resolvedParams = await searchParams;
  const { id } = resolvedParams
  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  })

  if(!configuration) {
    return notFound()
  }
  return (
   <>
   <DesignPreview
   configuration={configuration}
   />
   </>
  )
}

export default page