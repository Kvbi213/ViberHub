/** @type {import('next').NextConfig} */
const isExport = process.env.BUILD_TARGET === 'export' || process.env.EXPORT_STATIC === 'true';

const nextConfig = {
  ...(isExport ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
