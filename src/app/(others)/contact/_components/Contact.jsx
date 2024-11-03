"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import imageUrlBuilder from "@sanity/image-url"
// import { format } from "date-fns"
// import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import * as z from "zod"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

import { Button } from "@/components/ui/button"


import { sanityClient } from "@/services/sanityClient"

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
  return builder.image(source)
}

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().optional(),
})

export default function Contact({ data }) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // Show success message to user
      alert('Message sent successfully!');
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  if (!data)
    return (
      <div className='flex h-screen animate-spin items-center justify-center'>
        <AiOutlineLoading3Quarters />
      </div>
    )

  return (
    <div className='h-fit p-4 md:px-8 md:py-20 '>
      <div className='mx-auto max-w-4xl overflow-hidden'>
        <div className='md:flex'>
          <div className='p-6 md:w-1/3'>
            <h1 className='mb-4 text-3xl font-bold'>Contact Us</h1>
            {data?.contact?.images[0] && (
              <img
                src={urlFor(data?.contact?.images?.[0])?.url()}
                alt='Apartment'
                className='mb-4 h-48 w-full object-cover'
              />
            )}
            <p className='text-sm'>
              {data?.address}
              <br />
              phone: {data?.contactPhone}
            </p>
          </div>
          <div className='p-6 md:w-2/3'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='firstName'>First Name *</Label>
                  <Input {...form.register("firstName")} id='firstName' />
                  {form.formState.errors.firstName && (
                    <p className='text-sm text-red-500'>
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor='lastName'>Last Name *</Label>
                  <Input {...form.register("lastName")} id='lastName' />
                  {form.formState.errors.lastName && (
                    <p className='text-sm text-red-500'>
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor='email'>Email Address *</Label>
                <Input {...form.register("email")} id='email' type='email' />
                {form.formState.errors.email && (
                  <p className='text-sm text-red-500'>
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor='phone'>Phone Number *</Label>
                <Input {...form.register("phone")} id='phone' type='tel' />
                {form.formState.errors.phone && (
                  <p className='text-sm text-red-500'>
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor='message'>Message (Optional)</Label>
                <Textarea {...form.register("message")} id='message' />
              </div>
              {form.formState.errors.acceptTerms && (
                <p className='text-sm text-red-500'>
                  {form.formState.errors.acceptTerms.message}
                </p>
              )}
              <Button type='submit' className='w-full bg-blue-900 hover:bg-blue-950'>
                CONTACT ME
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
