"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { imageUrl } from "@/services/sanity"

const Nav = ({ data }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#060d20] z-50 py-3 text-sm text-white ">
      {/* Desktop Navigation */}
      <div className='hidden items-center justify-between px-10 lg:flex'>
        <Link
          href='/'
          className='overflow-hidden h-14 flex items-center'>
          <Image
            src={data?.logo ? imageUrl(data.logo) : "/placeholder-logo.png"}
            width={100}
            height={100}
            alt='Logo'
            className='object-contain h-full w-auto'
          />
        </Link>
        <Link 
          href='/contact'
          className="hover:text-blue-300 transition-colors duration-300">
          CONTACT US
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className='flex items-center justify-between px-4 lg:hidden'>
        <Link
          href='/'
          className='overflow-hidden h-10 flex items-center'>
          <Image
            src={data?.logo ? imageUrl(data.logo) : "/placeholder-logo.png"}
            width={80}
            height={80}
            alt='Logo'
            className='object-contain h-full w-auto'
          />
        </Link>
        <Link 
          href='/contact'
          className="hover:text-blue-300 transition-colors duration-300">
          CONTACT US
        </Link>
      </div>
    </nav>
  )
}

export default Nav