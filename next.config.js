/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [],
  },
  // API ключи встроены в код, переменные окружения не нужны
}

module.exports = nextConfig
