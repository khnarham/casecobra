'use client'
import React, { useRef, useState, useTransition } from 'react'
import NextImage from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn, formatPrice } from '@/lib/utils'
import {Rnd} from 'react-rnd'
import HandleComponent from '@/components/HandleComponent'
import { ScrollArea } from '@/components/ui/scroll-area'
import {Radio,Label , RadioGroup, Description } from '@headlessui/react';
import { COLORS, FINISHES, MATERIALS, MODELS } from '@/validators/options-validators'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react'
import { BASE_PRICE } from '@/config/Product'
import { useUploadThing } from '@/lib/uploadthing'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { saveConfig as _saveConfig, SaveConfigArgs } from './actions'
import { useRouter } from 'next/navigation'
interface configuratorProps {
    imageUrl: string,
    configId: string,
   imageDimensions : {
     width: number,
     height: number,
   }
  
}
const DesignConfigurator = ({imageUrl , configId , imageDimensions}: configuratorProps ) => {
    console.log('imageUrl:', imageUrl );
     const router = useRouter()
    const {mutate: saveConfig , isPending} = useMutation({
       mutationKey: ['save-config'],
       mutationFn: async (args:SaveConfigArgs) => { 
          await Promise.all([saveConfiguration() , _saveConfig(args)])
       },
       onError: () => {
        toast({
          title: 'Something went wrong',
          description: 'There was an error on our end. Please try again.',
          variant: 'destructive',
        })
      },
      onSuccess: () => {
        router.push(`/configure/preview?id=${configId}`)
      }, 
    })
    const [Options, setOptions] = useState<{
        color: (typeof COLORS)[number]
        model: (typeof MODELS.options)[number]
        material: (typeof MATERIALS.options)[number]
        finish: (typeof FINISHES.options)[number]
      }>({
        color: COLORS[0],
        model: MODELS.options[0],
        material: MATERIALS.options[0],
        finish: FINISHES.options[0],
      })

      const {toast} = useToast();
      const [renderDimension, setRenderDimension] = useState({
        width: imageDimensions.width / 4,
        height: imageDimensions.height / 4,
      })
      const [renderPosition, setRenderPosition] = useState({
        x: 150,
        y: 205,
      })

      const phoneCaseRef = useRef<HTMLDivElement>(null);
      const containerRef = useRef<HTMLDivElement>(null);

      const {startUpload} = useUploadThing('imageUploader');

     async function saveConfiguration() {
       try {
     
        const {
          left: caseLeft,
          top: caseTop,
          width,
          height,
        } = phoneCaseRef.current!.getBoundingClientRect();
           const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();
       const leftOffset = caseLeft - containerLeft;
       const topOffset = caseTop - containerTop;
           const actualX = renderPosition.x - leftOffset;
           const actualY = renderPosition.y - topOffset;
        
           const canvas = document.createElement('canvas');
           canvas.width = width;
           canvas.height = height;
           const ctx = canvas.getContext('2d');

          const userImage = new Image()
          userImage.crossOrigin = 'anonymous'
          userImage.src = imageUrl;
          await new Promise((resolve)=> (userImage.onload = resolve))
          
          ctx?.drawImage(
           userImage,
           actualX,
           actualY,
           renderDimension.width,
           renderDimension.height,
          )

          const base64 = canvas.toDataURL()
          const base64Data = base64.split(',')[1];
          const blob = base64ToBlob(base64Data, 'image/png')
          const file = new File([blob], 'filename.png',  { type: 'image/png' })
        await startUpload([file] , {configId})
    
       } catch (error) {
        toast({
          title: 'Something went wrong',
          description:
            'There was a problem saving your config, please try again.',
          variant: 'destructive',
        })
       }
       function base64ToBlob(base64: string , mimeType: string) {
            const byteCharacter = atob(base64);
            const byteNumber = new Array(byteCharacter.length);
            for (let i = 0; i < byteNumber.length; i++) {
              byteNumber[i] = byteCharacter.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumber);
            return new Blob([byteArray], { type: mimeType });
       }
     }
  return (
    
    <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
    <div ref={containerRef} className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 '>
        <div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]' >
        <AspectRatio ref={phoneCaseRef}
        
         ratio={896 / 1831} className='pointer-events-none relative z-50 aspect-[896/1831] w-full'>
        <NextImage
              fill
              alt='phone image'
              src='/phone-template.png'
              className='pointer-events-none z-50 select-none'
            />
   </AspectRatio> 
   <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]  shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
   <div
            className={cn(
              'absolute inset-0 left-[3px] top-px right-[3px]  bottom-px rounded-[32px]',
               `bg-${Options.color.tw}`
            )}
          />
        </div>
        <Rnd
        default={{
          x: 150,
          y:205,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4
        }}
        onResizeStop={(_, __, ref, ___, { x, y }) => {
           setRenderDimension({
            height: parseInt(ref.style.height.slice(0 , -2)),
            width: parseInt(ref.style.width.slice(0, -2))
           })
           setRenderPosition({
            x,
            y,
           })
        }}
        onDragStop={(_, data)=>{
          const { x, y } = data;
            setRenderPosition({
             x,
             y
            })
        }}
        lockAspectRatio
        resizeHandleComponent={{
           bottomRight: <HandleComponent/>,
            topRight: <HandleComponent/>,
            topLeft: <HandleComponent/>,
            bottomLeft: <HandleComponent/>,
        }}
        className='border-[3px]  z-20 border-primary '
        >
        <div className='relative  w-full h-full' >
           <NextImage
           fill
           src={imageUrl}
           alt='imageUrl'
            className='z-50 pointer-events-none'
           />
        </div>
        </Rnd>
      </div>

      <div className='h-[37.5rem] flex w-full col-span-full lg:col-span-1  flex-col bg-white '>
         <ScrollArea className='flex-1  relative overflow-y-auto '>
         <div
            aria-hidden='true'
            className='absolute z-10 inset-x-0 bottom-0  h-12 bg-gradient-to-t from-white pointer-events-none'
          />
          <div className='px-8 pb-12 pt-8'>
            <h2 className='tracking-tight font-bold text-2xl md:text-3xl'>
              Customize your case
            </h2>
            <div className='w-full h-px bg-zinc-200 my-6' />
            <div className='flex flex-col gap-6 h-full relative mt-4 justify-between'>
               <RadioGroup value={Options.color}
               onChange={(val)=>{
                   setOptions((pre)=>({
                    ...pre,
                     color: val,
                   }))
               }}
               >
                <h2>Color: {Options.color.label}</h2>
                <div className='flex mt-4 items-center space-x-3' >
                {COLORS.map((color) => (
  <Radio
    key={color.value}
    value={color}
    className={({ checked }) =>
      cn(
        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
        {
          [`border-${color.tw}`]:  checked,
        }
      )
    }>
<span
className={cn(
  `bg-${color.tw}`,
'h-8 w-8 rounded-full border border-black border-opacity-10'
)}/>
  </Radio>
))}
 
 </div>
               </RadioGroup>
               <div className='flex mt-4 flex-col w-full gap-3 relative' >
              <h2>Model</h2>
             <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='w-full justify-between'>
                        {Options.model.label}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            'flex text-sm gap-1  items-center p-1.5 cursor-default hover:bg-zinc-100',
                            {
                              'bg-zinc-100':
                                model.label === Options.model.label,
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }))
                          }}>
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              model.label === Options.model.label
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
               </div>
               {[MATERIALS, FINISHES].map(({name ,options: selectableOptions}) => (
                <RadioGroup key={name}
                value={Options[name]}
                onChange={(val)=>{
                  setOptions((prev) => ({
                       ...prev,
                        [name]: val,
                  }))
                }}
                >
                 <h2>{name.slice(0 ,1).toUpperCase() + name.slice(1)}</h2>
                 <div className='mt-3 space-y-4 '>
                      {selectableOptions.map((options)=>(
                          <Radio key={options.value}
                          value={options}
                          className={({ checked }) =>
                            cn(
                              'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
                              {
                                'border-primary':  checked,
                              }
                            )}
                          > 
                           <span className='flex items-center' >
                            <span className='flex flex-col text-sm '>
                                <Label className='text-gray-900 font-medium '>
                                   {options.label}
                                </Label>
                                {options.description ? (
                                  <Description className='text-gray-500'>
                                     <span className='block sm:inline'>{options.description}</span>
                                  </Description>
                                ): null}
                            </span>
                           </span>
                           <Description
                              as='span'
                              className='mt-2  flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'>
                              <span className='font-medium text-gray-900'>
                                {formatPrice(options.price / 100)}
                              </span>
                            </Description>
                          </Radio>
                      ))}
                 </div>
                </RadioGroup>
               ))}
            </div>
            </div>
         </ScrollArea>
         <div className='w-full px-8 h-16 bg-white'>
             <div className='h-px w-full bg-zinc-200'/>
             <div className='w-full h-full flex justify-end items-center'>
           <div className='flex w-full gap-6 items-center'>
             <p className='font-medium whitespace-nowrap'>{formatPrice((BASE_PRICE + Options.material.price + Options.finish.price) / 100)}</p>
             <Button
             isLoading={isPending}
             disabled={isPending}
             loadingText="Saving"
             onClick={() => saveConfig({
              configId,
              color: Options.color.value,
              finish: Options.finish.value,
              material: Options.material.value,
              model: Options.model.value,
             })}
                size='sm'
                className='w-full '>
                Continue
                <ArrowRight className='h-4 w-4 ml-1.5 inline' />
              </Button>
           </div>
             </div>
         </div>
      </div>
    </div>
  )
}

export default DesignConfigurator
