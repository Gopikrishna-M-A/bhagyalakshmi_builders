import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Whisper, Montserrat } from "next/font/google";
import { imageUrl } from "@/services/sanity";

const whisper = Whisper({ weight: "400", subsets: ["latin"], display: "swap" });
const montserratLight = Montserrat({ weight: "300", subsets: ["latin"], display: "swap" });

export default function TeamSection({ data }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
      className="bg-[#f4f4ef] pt-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h3 className={`${whisper.className} font-script mb-2 text-5xl text-blue-900 md:text-7xl`}>
            Our Team
          </h3>
          <h2 className="text-4xl font-bold mb-6 md:text-5xl">
            {data?.team?.heading || "Meet Our Leadership"}
          </h2>
          <p className={`${montserratLight.className} max-w-2xl mx-auto text-gray-600 text-sm md:text-base`}>
            Our leadership team brings together decades of experience in construction and development,
            ensuring excellence in every project we undertake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {data?.team?.members?.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group mx-auto w-full"
            >
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl">
                <Image
                  src={member.image ? imageUrl(member.image) : "/placeholder.jpg"}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top center"
                  alt={member.name || "Team member"}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <h3 className="text-3xl font-bold mb-2 text-white">
                    {member.name}
                  </h3>
                  <p className={`${montserratLight.className} text-lg text-white/90 uppercase tracking-wider`}>
                    {member.designation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}