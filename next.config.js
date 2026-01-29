/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/virtual-lab-bod-cod', // Update this with your repo name
  assetPrefix: '/virtual-lab-bod-cod',
  trailingSlash: true,
}

module.exports = nextConfig
