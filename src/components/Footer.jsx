import React from "react";
import { Whisper } from "next/font/google";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { fetchData } from "@/services/sanity";

const whisper = Whisper({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Footer = async () => {
  const footerData = await fetchData();

  return (
    <footer className="bg-[#060d20] py-10 text-white">
      <div className="container mx-auto space-y-6 px-4 text-center md:space-y-10">
        {/* Heading */}
        <h2 className={`text-5xl md:text-7xl ${whisper.className} text-blue-300`}>
       {footerData?.footer?.heading}
        </h2>

        {/* Contact Info */}
        <div className="space-y-4 md:space-y-2">
          <div className="font-bold capitalize text-blue-300">Contact</div>
          <p className="text-sm md:text-base">
            {footerData?.companyName} {footerData?.address}
          </p>
          <p className="text-sm md:text-base">
            {footerData?.contactPhone} &nbsp;|&nbsp; {footerData?.contactEmail}
          </p>
        </div>

        {/* Social Links */}
        <div>
          <div className="mb-2 font-bold capitalize text-blue-300">Be Social</div>
          <div className="space-x-4">
            {footerData?.socialMedia?.facebook && (
              <a href={footerData.socialMedia.facebook} className="bg-muted-foreground inline-block rounded-full p-2">
                <FaFacebookF />
              </a>
            )}
            {footerData?.socialMedia?.twitter && (
              <a href={footerData.socialMedia.twitter} className="bg-muted-foreground inline-block rounded-full p-2">
                <RiTwitterXFill />
              </a>
            )}
            {footerData?.socialMedia?.youtube && (
              <a href={footerData.socialMedia.youtube} className="bg-muted-foreground inline-block rounded-full p-2">
                <FaYoutube />
              </a>
            )}
            {footerData?.socialMedia?.instagram && (
              <a href={footerData.socialMedia.instagram} className="bg-muted-foreground inline-block rounded-full p-2">
                <FaInstagram />
              </a>
            )}
          </div>
        </div>

        {/* Legal Links */}
        <div className="space-y-2 text-xs text-gray-400">
          <p>&copy; {footerData?.footer?.copyrightText} {footerData?.companyName || 'Company Name'} </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;