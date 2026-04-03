import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://animaker.dev/sitemap.xml',
    host: 'https://animaker.dev',
  };
}
