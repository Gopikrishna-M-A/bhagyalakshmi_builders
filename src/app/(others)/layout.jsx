import Nav from "@/components/Nav";
import { fetchData } from "@/services/sanity";

export default async function RootLayout({ children }) {
  const data = await fetchData();
  return (
    <div className="bg-[#f4f4ef]">
      <Nav data={data}/>
      <div className="mt-20 md:mt-24">{children}</div>
    </div>
  );
}
