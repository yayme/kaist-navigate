/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Uncomment and set basePath if deploying to a repo subdirectory
  // basePath: '/kaist-companion-webapp',
}

module.exports = nextConfig
