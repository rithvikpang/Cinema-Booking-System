// next.config.mjs

/**
 * @type {import('next').NextConfig}
 */
// next.config.mjs

const nextConfig = {
  images: {
    domains: [], // Remove any existing domains configuration
    // Add a remotePatterns configuration to allow all remote URLs
    // This allows Next.js to optimize images from any domain
    // Change the regex pattern as needed to match your image URLs
    remotePatterns: [
      {
        // Specify the domain pattern using a regular expression
        hostname: 'www\\.movieposters\\.com', // Matches www.movieposters.com
        // Optionally, you can specify additional patterns like path
        // path: '/.*', // Matches any path
      },
    ],
  },
  // ... any other configurations
};

export default nextConfig;

  