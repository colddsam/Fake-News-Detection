/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://truthguardian.vercel.app/', 
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    changefreq: 'weekly',
    priority: 1.0,
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
        'https://truthguardian.vercel.app/sitemap.xml', 
      ],
    },
  };
  