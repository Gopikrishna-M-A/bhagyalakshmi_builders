"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mail, PanelTop, Menu } from "lucide-react"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { imageUrl } from "@/services/sanity"

const Nav = ({ data }) => {
  const [isSticky, setIsSticky] = useState(false)
  const navRef = useRef(null)
  const navPlaceholderRef = useRef(null)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    if (!isHomePage) {
      setIsSticky(true)
      return
    }

    const navbar = navRef.current
    const navbarPlaceholder = navPlaceholderRef.current
    const navbarHeight = navbar.offsetHeight
    const initialNavbarTop =
      navbar.getBoundingClientRect().top + window.pageYOffset

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset

      if (currentScrollY > initialNavbarTop) {
        if (!isSticky) {
          setIsSticky(true)
          navbarPlaceholder.style.height = `${navbarHeight}px`
        }
      } else {
        if (isSticky) {
          setIsSticky(false)
          navbarPlaceholder.style.height = "0px"
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isSticky, isHomePage])

  const navClasses = isHomePage
    ? `bg-[#060d20] z-50 py-4 text-sm text-white shadow-md transition-all duration-300
       ${isSticky ? "animate-slideDown fixed left-0 right-0 top-0" : ""}`
    : "bg-[#060d20] z-50 py-4 text-sm text-white shadow-md fixed left-0 right-0 top-0"

  return (
    <>
      {isHomePage && <div ref={navPlaceholderRef} />}
      <nav ref={navRef} className={navClasses}>
        {/* Desktop Navigation */}
        <div className='hidden grid-cols-3 items-center gap-4 px-10 lg:grid'>
          <div className='flex gap-2 justify-self-start text-white'>
            {data?.socialMedia?.instagram && (
              <a
                href={data.socialMedia.instagram}
                className='bg-muted-foreground inline-block rounded-full p-2'>
                <FaInstagram className='h-4 w-4' />
              </a>
            )}
            {data?.contactEmail && (
              <a
                href={`mailto:${data.contactEmail}`}
                className='bg-muted-foreground inline-block rounded-full p-2'
                aria-label='Send email'>
                <Mail className='h-4 w-4' />
              </a>
            )}
            {data?.socialMedia?.facebook && (
              <a
                href={data.socialMedia.facebook}
                className='bg-muted-foreground inline-block rounded-full p-2'>
                <FaFacebookF className='h-4 w-4' />
              </a>
            )}
          </div>
          <Link
            href='/'
            className='justify-self-center overflow-hidden h-20 flex items-center'>
            <Image
              src={data?.logo ? imageUrl(data.logo) : "/placeholder-logo.png"}
              width={150}
              height={150}
              alt='Logo'
              className='object-contain h-full w-auto'
            />
          </Link>
          <div className='flex gap-3 justify-self-end'>
            <Link href='/contact'>CONTACT US</Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className='flex items-center justify-between px-4 lg:hidden'>
        <Link
            href='/'
            className='justify-self-center overflow-hidden h-12 flex items-center'>
            <Image
              src={data?.logo ? imageUrl(data.logo) : "/placeholder-logo.png"}
              width={100}
              height={100}
              alt='Logo'
              className='object-contain h-full w-auto'
            />
          </Link>
          <div className='flex items-center gap-5'>
            <div className='flex gap-3 text-white'>
            {data?.socialMedia?.instagram && (
            <a href={data.socialMedia.instagram} className='inline-block rounded-full'>
            <PanelTop className='h-4 w-4' />
            </a>
            )}
            {data?.contactEmail && (
                <a href={data.contactEmail} className='inline-block rounded-full'>
                <Mail className='h-4 w-4' />
              </a>
            )}
            {data?.socialMedia?.facebook && (
                <a href={data.socialMedia.facebook} className='inline-block rounded-full'>
                <FaFacebookF className='h-4 w-4' />
              </a>
            )}
            </div>
            <Link href='/contact'>CONTACT US</Link>
            {/* <Sheet>
              <SheetTrigger asChild>
                <button className='text-white'>
                  <Menu className='h-6 w-6' />
                </button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='bg-foreground border-foreground w-[300px] text-[#b3a083] sm:w-[400px]'>
                <div className='mt-6 flex flex-col items-end gap-4'>
                  <Link href='/' className='text-lg'>
                    HOME
                  </Link>
                  <Link href='/floorplans' className='text-lg'>
                    FLOOR PLANS
                  </Link>
                  <Link href='/photos' className='text-lg'>
                    PHOTOS & TOUR
                  </Link>
                  <Link href='/amenities' className='text-lg'>
                    AMENITIES
                  </Link>
                  <Link href='/directions' className='text-lg'>
                    DIRECTIONS
                  </Link>
                  <Link href='faq' className='text-lg'>
                    FAQS
                  </Link>
                  <Link href='/contact' className='text-lg'>
                    CONTACT US
                  </Link>
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
