import { sanityClient, urlFor } from "./sanityClient";

export const fetchData = async () => {
  const documentType = process.env.NEXT_PUBLIC_SANITY_DOCUMENT_TYPE;
  const documentId = process.env.NEXT_PUBLIC_SANITY_DOCUMENT_ID;
  const query = `*[_type == "${documentType}" && _id == "${documentId}"]`;
  const data = await sanityClient.fetch(query, {}, { cache: "no-store" });
  return data?.[0];
};

export const imageUrl = (image) => {
  try {
    const url = urlFor(image).url();
    return url;
  } catch (error) {
    console.error("Error generating URL for image:", image, error);
    return ''; // Return null or a fallback URL in case of an error
  }
};
