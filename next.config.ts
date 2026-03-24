/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**', // عشان يسمح بأي مسار للصور من الموقع ده
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // لو هتستخدم placehold.co (لأن ساعات بيرجع بصيغة SVG) يفضل تضيف السطرين دول:
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
    buildActivityPosition: 'bottom-right'
  }
};

export default nextConfig;
// ملاحظة: لو ملفك بينتهي بـ .js مش .mjs، استبدل السطر اللي فوق بـ:
// module.exports = nextConfig;