"use client"
import React, { useEffect, useState } from "react"
import { Montserrat, Whisper } from "next/font/google"
import Image from "next/image"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Nav from "@/components/Nav"
import { imageUrl } from "@/services/sanity"
import Link from "next/link"
import TeamSection from "./TeamSection"




const whisper = Whisper({ weight: "400", subsets: ["latin"], display: "swap" })
const montserratBold = Montserrat({
  weight: "800",
  subsets: ["latin"],
  display: "swap",
})
const montserratLight = Montserrat({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
})

const useFadeInAnimation = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return { ref, controls }
}

export default function Landing({ data }) {
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

  const { ref: refAbout, controls: controlsAbout } = useFadeInAnimation()
  const { ref: refLocations, controls: controlsLocations } =
    useFadeInAnimation()
  const { ref: refNews, controls: controlsNews } = useFadeInAnimation()
  const { ref: refGallery, controls: controlsGallery } = useFadeInAnimation()
  const { ref: refContact, controls: controlsContact } = useFadeInAnimation()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) =>
          (prevIndex + 1) % (data?.hero?.backgroundImages?.length || 1)
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [data?.hero?.backgroundImages])

  const openGalleryDialog = (index) => {
    setCurrentImageIndex(index)
    setIsGalleryDialogOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex + 1) % (data?.projectGallery?.projects?.length || 1)
    )
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + (data?.projectGallery?.projects?.length || 1)) %
        (data?.projectGallery?.projects?.length || 1)
    )
  }

  const handleNextNews = () => {
    setCurrentNewsIndex(
      (prevIndex) => (prevIndex + 1) % (data?.news?.newsItems?.length || 1)
    )
  }

  const handleNextLocation = () => {
    setCurrentLocationIndex(
      (prevIndex) =>
        (prevIndex + 1) % (data?.locations?.locationItems?.length || 1)
    )
  }

  return (
    <div className='min-h-screen bg-[#f4f4ef] '>
      <div className='flex h-screen flex-col'>
        {/* Hero Section */}
        <section className='relative h-screen overflow-hidden'>
          <AnimatePresence initial={false}>
            <motion.div
              key={currentBannerIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='absolute inset-0'>
              <Image
                src={
                  data?.hero?.backgroundImages?.[currentBannerIndex]
                    ? imageUrl(data.hero.backgroundImages[currentBannerIndex])
                    : "/placeholder.jpg"
                }
                layout='fill'
                objectFit='cover'
                alt={`Banner ${currentBannerIndex + 1}`}
              />
              <div className='absolute inset-0 bg-gray-900 opacity-50'></div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className='relative z-10 flex h-full flex-col items-center justify-center text-center text-white'>
            <div className='mb-8 opacity-60'>
              <Image
                src={data?.logo ? imageUrl(data.logo) : "/placeholder-logo.png"}
                width={200}
                height={100}
                objectFit='contain'
                alt='Company Logo'
              />
            </div>
            <h1
              className={`mb-4 text-4xl font-bold md:text-7xl ${montserratBold.className} opacity-60`}>
              {data?.hero?.heading || "Welcome"}
            </h1>
            <p
              className={`mb-8 text-sm uppercase ${montserratLight.className}`}>
              {data?.hero?.subheading || "Discover our projects"}
            </p>
            <Link href='/contact' className='flex space-x-4'>
  <Button className='bg-blue-950 hover:bg-blue-900 transition-all text-lg px-28 py-4 h-auto font-semibold'>
    {data?.hero?.ctaButtonText || "Explore"}
  </Button>
</Link>
          </motion.div>
        </section>

        {/* Navigation */}
        <div>
          <Nav data={data}/>
        </div>
      </div>

      <TeamSection data={data}/>

      {/* About Us Section */}
      <motion.section
        ref={refAbout}
        animate={controlsAbout}
        initial='hidden'
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.5 }}
        className='bg-[#f4f4ef] pt-10 pb-32 md:py-32'>
        <div className='container mx-auto max-w-6xl px-4'>
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <div className='mt-12 w-full md:mt-0 md:w-1/2 md:pl-12'>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`font-script mb-2 font-serif text-5xl italic text-blue-900 md:text-7xl ${whisper.className}`}>
                About Us
              </motion.h3>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className='mb-4 text-4xl font-bold md:text-5xl'>
                {data?.about?.heading || "Welcome to our Company"}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className='mb-6 w-3/4 text-sm text-gray-600 md:text-lg'>
                {data?.about?.description ||
                  "Discover our commitment to excellence in construction."}
              </motion.div>
            </div>

            <div className='relative flex w-full justify-end md:w-1/2'>
              <div className='relative h-80 w-3/4 md:h-80'>
                <Image
                  src={
                    data?.about?.images?.[0]
                      ? imageUrl(data.about.images[0])
                      : "/placeholder.jpg"
                  }
                  layout='fill'
                  objectFit='cover'
                  alt='About us feature'
                  className="rounded-xl"
                />
              </div>
              <div className='absolute -left-0 bottom-0 -mb-8 -mr-4 h-40 w-1/2 md:-left-20 md:-mb-12 md:-mr-8 md:h-80'>
                <Image
                  src={
                    data?.about?.images?.[1]
                      ? imageUrl(data.about.images[1])
                      : "/placeholder.jpg"
                  }
                  layout='fill'
                  objectFit='cover'
                  alt='About us feature'
                   className="rounded-xl"
                    objectPosition="top center"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Locations Section */}
      {data?.locations && (
        <motion.section
          ref={refLocations}
          animate={controlsLocations}
          initial='hidden'
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          transition={{ duration: 0.5 }}
          className='bg-[#060d20] text-primary-foreground pt-16 md:min-h-screen'>
          <div className='container mx-auto px-4'>
            {/* <h2
              className={`mb-8 text-center text-4xl font-bold md:text-5xl ${montserratBold.className}`}>
              {data.locations.heading || "Our Locations"}
            </h2> */}
            <h3 className={`${whisper.className} text-center text-5xl md:text-7xl text-blue-300 mb-4`}>
                {data.locations.heading || "Our Presence"}
              </h3>
            <p
              className={`mx-auto mb-8 max-w-3xl text-center text-xs uppercase  ${montserratLight.className}`}>
              {data.locations.description || "Discover where we operate."}
            </p>
            <div className='mb-8 flex justify-center'>
              <Button
                className='bg-blue-900 hover:bg-blue-950'
                onClick={handleNextLocation}>
                Next Location
              </Button>
            </div>
          </div>
          <div className='w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              {data.locations.locationItems
                ?.slice(currentLocationIndex, currentLocationIndex + 4)
                .map((item, index) => (
                  <div
                    key={index}
                    className={`group relative h-80 overflow-hidden cursor-pointer ${
                      index === 0 ? "" : "hidden md:block"
                    }`}>
                    <Image
                      src={
                        item.image ? imageUrl(item.image) : "/placeholder.jpg"
                      }
                      layout='fill'
                      objectFit='cover'
                      alt={item.cityName || "Location feature"}
                      className='transition-transform duration-300 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 flex flex-col justify-end bg-black bg-opacity-40 p-6 text-white transition-all duration-300'>
                      <div className='transform transition-transform duration-300 group-hover:-translate-y-4'>
                        <h3 className='mb-2 text-2xl font-bold'>
                          {item.cityName || "Location"}
                        </h3>
                        <p className='text-sm'>
                          {item.description || "Description unavailable"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Current News Section */}
      {data?.news?.newsItems && data.news.newsItems.length > 0 && (
        <motion.section
          ref={refNews}
          animate={controlsNews}
          initial='hidden'
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          transition={{ duration: 0.5 }}
          className='bg-[#f4f4ef] py-16'>
          <div className='container mx-auto px-4'>
            <div className='grid items-center justify-between gap-8 lg:grid-cols-3 lg:gap-4'>
              {/* Left Image */}
              <div className='relative h-[250px] w-full lg:h-[500px] lg:w-auto'>
                <Image
                  src={
                    data?.news?.newsImages?.[0]
                      ? imageUrl(data.news.newsImages[0])
                      : "/placeholder.jpg"
                  }
                  layout='fill'
                  objectFit='cover'
                  alt='News feature'
                  className='rounded-lg'
                />
              </div>

              {/* Center Content */}
              <div className='py-10 text-center lg:py-32'>
                <h3
                  className={`font-script mb-2 text-5xl text-blue-900 md:text-7xl ${whisper.className}`}>
                  Our Expertise
                </h3>
                <h2 className='mb-4 text-4xl font-bold md:text-5xl'>
                  {data.news.heading || "News"}
                </h2>
                <div className='mx-auto md:min-h-48 md:w-3/4'>
                  <p className='mb-2 text-sm text-gray-600 md:text-lg'>
                    {data.news.newsItems[currentNewsIndex]?.date ||
                      "Date unavailable"}
                  </p>
                  <p className='mb-2 text-sm font-semibold md:text-lg'>
                    {data.news.newsItems[currentNewsIndex]?.title ||
                      "Title unavailable"}
                  </p>
                  <p className='mb-2 text-sm md:text-lg'>
                    {data.news.newsItems[currentNewsIndex]?.description ||
                      "Content unavailable"}
                  </p>
                </div>
                <Button
                  className='bg-blue-900 hover:bg-blue-950'
                  onClick={handleNextNews}>
                  NEXT
                </Button>
              </div>

              {/* Right Image */}
              <div className='relative h-[250px] w-full lg:h-[500px] lg:w-auto'>
                <Image
                  src={
                    data?.news?.newsImages?.[1]
                      ? imageUrl(data.news.newsImages[1])
                      : "/placeholder.jpg"
                  }
                  layout='fill'
                  objectFit='cover'
                  alt='News feature'
                  className='rounded-lg'
                />
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Project Gallery Section */}
      <motion.section
  id='projects'
  ref={refGallery}
  animate={controlsGallery}
  initial='hidden'
  variants={{
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  }}
  transition={{ duration: 0.5 }}
  className='bg-[#060d20] py-16 text-white'>
  <div className='container mx-auto px-4'>
    <h3 className={`${whisper.className} text-center text-5xl md:text-7xl text-blue-300 mb-4`}>
      {data?.projectGallery?.heading || "Project Gallery"}
    </h3>
    <p className='mx-auto mb-8 max-w-3xl text-center text-xs uppercase '>
      {data?.projectGallery?.description || "Explore our projects"}
    </p>
    <div className='grid auto-rows-[200px] grid-cols-2 gap-2 md:grid-cols-4'>
      {data?.projectGallery?.projects?.map((project, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden 
            ${index === 2 ? "row-span-2 md:row-span-1" : ""}
            ${index === 3 ? "col-span-1 row-span-2" : ""}
            ${index === 4 ? "col-span-2 row-span-2" : ""}
            ${index > 4 ? "col-span-1" : ""}
            ${index === 7 ? "col-span-2 md:col-span-1" : ""}`}
          onClick={() => openGalleryDialog(index)}>
          <Image
            src={
              project.image ? imageUrl(project.image) : "/placeholder.jpg"
            }
            alt={`${project.clientName}'s project`}
            layout='fill'
            objectFit='cover'
            className='cursor-pointer rounded-sm transition-transform duration-300 ease-in-out group-hover:scale-110'
          />
          <div className='absolute inset-0 flex flex-col justify-end bg-black bg-opacity-60 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <h3 className='text-lg font-bold'>{project.clientName}</h3>
            <p className='text-sm text-gray-300'>{project.time}</p>
            <p className='text-sm mt-1'>{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</motion.section>

      {/* Contact Section */}
      <motion.section
        ref={refContact}
        animate={controlsContact}
        initial='hidden'
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.5 }}
        className='bg-[#f4f4ef] py-32'>
        <div className='container mx-auto max-w-6xl px-4'>
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <div className='relative flex w-full justify-start md:w-1/2'>
              <div className='relative h-80 w-3/4 md:h-80'>
                <Image
                  src={
                    data?.contact?.images?.[0]
                      ? imageUrl(data.contact.images[0])
                      : "/placeholder.jpg"
                  }
                  layout='fill'
                  objectFit='cover'
                  alt='Contact us feature'
                   className="rounded-xl"
                />
              </div>
              <div className='absolute -right-0 bottom-0 -mb-8 -ml-4 h-40 w-1/2 md:-right-20 md:-mb-12 md:-ml-8 md:h-80'>
                <Image
                  src={
                    data?.contact?.images?.[1]
                      ? imageUrl(data.contact.images[1])
                      : "/placeholder.jpg"
                  }
                  layout='fill'
                  objectFit='cover'
                  alt='Contact us feature'
                   className="rounded-xl"
                />
              </div>
            </div>

            <div className='mt-12 w-full md:mt-0 md:w-1/2 md:pl-12 md:text-right'>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`font-script mb-2 font-serif text-5xl italic text-blue-900 md:text-7xl ${whisper.className}`}>
                Contact Us
              </motion.h3>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className='mb-4 text-4xl font-bold md:text-5xl'>
                {data?.contact?.heading || "Get in Touch"}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className='mb-6 w-3/4 text-sm text-gray-600 md:max-w-md md:ml-auto md:w-full md:text-lg'>
                {data?.contact?.description ||
                  "We'd love to hear from you. Contact us for any inquiries."}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}>
                <Link href='/contact'>
                  <Button className='bg-blue-900 hover:bg-blue-950'>
                    {data?.contact?.ctaButtonText || "CONTACT US"}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
  <DialogContent className='flex h-[90vh] items-center justify-center p-0 sm:max-w-[90vw]'>
    <div className='relative h-full w-full'>
      <Image
        src={
          data?.projectGallery?.projects?.[currentImageIndex]?.image
            ? imageUrl(
                data.projectGallery.projects[currentImageIndex].image
              )
            : "/placeholder.jpg"
        }
        alt='Gallery image'
        layout='fill'
        objectFit='contain'
      />
      
      {/* Project Details Overlay */}
      <div className='absolute -bottom-1 -left-1 -right-1 bg-black bg-opacity-70 p-6 text-white'>
        <h3 className='text-xl font-bold mb-2'>
          {data?.projectGallery?.projects?.[currentImageIndex]?.clientName || 'Client Name'}
        </h3>
        <p className='text-gray-300 text-sm mb-2'>
          {data?.projectGallery?.projects?.[currentImageIndex]?.time || 'Project Time'}
        </p>
        <p className='text-sm'>
          {data?.projectGallery?.projects?.[currentImageIndex]?.description || 'Project Description'}
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className='absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-75'>
        <ChevronLeft className='h-6 w-6' />
      </button>
      <button
        onClick={nextImage}
        className='absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-75'>
        <ChevronRight className='h-6 w-6' />
      </button>
    </div>
  </DialogContent>
</Dialog>
    </div>
  )
}
