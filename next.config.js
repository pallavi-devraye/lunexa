/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All imagery is self-hosted SVG in /public/images — no remote loaders needed.
    // Add remotePatterns here only if you later serve images from another origin.
    remotePatterns: [],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // No page here needs the camera, microphone, or location.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // The admin dashboard renders customer enquiries. Belt and braces
        // alongside the robots rules and the noindex metadata on the page.
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

module.exports = nextConfig;
