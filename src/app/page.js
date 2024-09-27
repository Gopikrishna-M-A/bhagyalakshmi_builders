import React from "react";
import { fetchData } from "@/services/sanity";
import Landing from "@/components/Landing";

export default async function Home() {
  const data = await fetchData();

  return <Landing data={data} />;
}
