import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import { Reviews } from "@/components/Reviews";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <section>
        <MaxWidthWrapper className=" pt-10 lg:grid lg:grid-cols-3 sm:pb-32 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 pb-24">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="flex flex-col items-center text-center lg:items-start relative mx-auto lg:text-left">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <Image src="/snake-1.png" alt="snake" width={100} height={100} />
              </div>
              <h1 className="relative w-fit tracking-tighter text-balance mt-16 font-bold !leading-tight text-5xl md:text-6xl lg:text-7xl text-gray-900">
                Your Image on <span className="bg-green-600 text-white px-2">Custom</span> Phone Case
              </h1>
              <p className="max-w-prose w-full mt-8 font-normal lg:pr-10 text-center lg:text-left text-balance md:text-wrap">
                Capture your Favorite memories with your own,{" "}
                <span className="font-bold">one-of-one</span> Phone case.
                CaseCobra allows you to protect your memories, not just your Phone case.
              </p>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex font-medium gap-1.5 items-center text-left">
                    <Check className="w-4 h-4 shrink-0 text-green-600" />
                    High Quality, Durable Material
                  </li>
                  <li className="flex font-medium gap-1.5 items-center text-left">
                    <Check className="w-4 h-4 shrink-0 text-green-600" />
                    5-year print guarantee
                  </li>
                  <li className="flex font-medium gap-1.5 items-center text-left">
                    <Check className="w-4 h-4 shrink-0 text-green-600" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>
              <div className="flex flex-col sm:flex-row mt-12 items-center sm:items-start gap-3">
                <div className="flex -space-x-4">
                  {["user-1.png", "user-2.png", "user-3.png", "user-4.jpg", "user-5.jpg"].map((src, index) => (
                    <Image
                      key={index}
                      src={`/${src}`}
                      alt={`user-${index + 1}`}
                      width={500}
                      height={500}
                      className="rounded-full inline-block h-10 w-10 ring-2 ring-slate-100"
                    />
                  ))}
                </div>
                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="w-4 h-4 text-green-600 fill-green-600" />
                    ))}
                  </div>
                  <p>
                    <span className="font-semibold">1,250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mx-auto lg:mx-0 mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Image
                src="/your-image.png"
                alt="your-image"
                width={200}
                height={200}
                className="absolute left-56 -top-20 select-none w-40 hidden sm:block xl:block lg:hidden"
              />
              <Image
                src="/line.png"
                alt="line"
                width={400}
                height={400}
                className="w-20 absolute -left-6 -bottom-6 select-none"
              />
              <Phone className="w-48" imgSrc="/1.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex items-center flex-col gap-16 sm:gap-32">
          <div className="flex flex-col items-center lg:flex-row gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-balance text-center font-bold text-5xl md:text-6xl text-gray-900 !leading-tight">
              What our{" "}
              <span className="relative px-2">
                customers
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
              </span>{" "}
              say
            </h2>
            <Image
              src="/snake-2.png"
              alt="snake"
              width={100}
              height={100}
              className="w-24 order-0 lg:order-2"
            />
          </div>
          <div className="mx-auto grid grid-cols-1 w-full max-w-2xl px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
          <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  "The case feels durable and I even got a compliment on the
                  design. Had the case for two and a half months now and{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it."
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/user-1.png'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Jonathan</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second user review */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  "I usually keep my phone together with my keys in my pocket
                  and that led to some pretty heavy scratchmarks on all of my
                  last phone cases. This one, besides a barely noticeable
                  scratch on the corner,{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                    looks brand new after about half a year
                  </span>
                  . I dig it."
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/user-4.jpg'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Josh</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="pt-16">
          <Reviews />
        </div>
      </section>
      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="w-full mx-auto max-w-2xl sm:text-center" >
          <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
              Upload Your photo and get
              <span className='relative bg-green-600 text-white  px-2'>
                your own case
              </span>{' '}
              now
            </h2>

            </div>
          </div>

          <div className="mx-auto w-full  max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40" >
            <Image
            src='/arrow.png'
            alt="arrow"
            width={120}
            height={120}
            className="absolute top-[20rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0 "
            />

            <div className="relative h-60 md:h-full w-full md:justify-self-end max-w-sm rounded-md ring-inset bg-gray-500/5 ring-gray-900/10 lg:rounded-2xl" >
             <Image
             src='/horse.jpg'
             alt="horse"
             width={300}
             height={300}
             className="object-cover rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 w-full h-full"
             />
            </div>
            <Phone className="w-60" imgSrc='/horse.jpg' />
            </div>
          </div>
          <ul className="mx-auto mt-12 font-medium   max-w-prose sm:text-lg: w-fit space-y-2 " >
              <li className="w-fitt">
                  <Check className="w-4 h-4 text-green-600 inline mr-1.5" />
                  High Quality silicon Material 
              </li>
              <li className="w-fitt">
                  <Check className="w-4 h-4 text-green-600 inline mr-1.5" />
                  Scratch and fingerprint resistance coating 
              </li>
              <li className="w-fitt">
                  <Check className="w-4 h-4 text-green-600 inline mr-1.5" />
                  Wireless charging compatible
              </li>
              <li className="w-fitt">
                  <Check className="w-4 h-4 text-green-600 inline mr-1.5" />
                  5 year print  warranty 
              </li>
              <div className="flex justify-center " >
                 <Link className={buttonVariants({
                  size: 'lg',
                    className: 'mt-8 mx-auto'
                 })} href='/configure/upload ' >
                      Create Your case now <ArrowRight className="w-4 h-4 ml-1.5" />
                 </Link>
              </div>
          </ul>
        </MaxWidthWrapper>
      </section>
   
    </div>
  );
}
