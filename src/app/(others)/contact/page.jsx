import React from "react";
import { fetchData } from "@/services/sanity";
import Contact from "./_components/Contact";

export default async function AmenitiesPage() {
  const data = await fetchData();

  return <Contact data={data} />;
}
