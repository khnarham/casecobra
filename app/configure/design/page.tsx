import { db } from '@/DB';
import { notFound } from 'next/navigation';
import React from 'react'
import { string } from 'zod';
import DesignConfigurator from './DesignConfigurator';
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;

}
const page:React.FC<PageProps> = async({searchParams}) => {
  const resolvedParams = await searchParams;
  const { id } = resolvedParams;

  if(!id || typeof id != 'string') {
     return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: {id}
  })

  if(!configuration) {
    return notFound();
  }

  const {imageUrl , width , height} = configuration;
   
  return (
    <div>
      <DesignConfigurator
      imageUrl={imageUrl}
      configId={configuration.id}
      imageDimensions={{width , height}}
      />
    </div>
  )
}

export default page