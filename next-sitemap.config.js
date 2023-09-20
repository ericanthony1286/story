/** @type {import('next-sitemap').IConfig} */

const siteUrl = "https://truyenfun.vn";
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/cate-sitemap.xml`,
      `${siteUrl}/story-sitemap.xml`,
    ],
  },
};
