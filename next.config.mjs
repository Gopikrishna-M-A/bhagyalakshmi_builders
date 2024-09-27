/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            pathname: '/images/**',
          },
          {
            protocol: 'https',
            hostname: 'medialibrarycfo.entrata.com',
            pathname: '/**',
          },
        ],
      }
};

export default nextConfig;
