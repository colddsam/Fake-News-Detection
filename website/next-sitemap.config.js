/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://fake-news-detection-inky.vercel.app/', 
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/api/*'], 
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      additionalSitemaps: [
        'https://fake-news-detection-inky.vercel.app/sitemap.xml', 
      ],
    },
  };
  