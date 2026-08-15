#!/usr/bin/env node
// Generates public/sitemap.xml from the app's route data.
// Run: node scripts/generate-sitemap.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://govcongiants.com';

const articlesSrc = readFileSync(path.join(root, 'src/data/articles.ts'), 'utf8');
const articleSlugs = [...articlesSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

const episodesSrc = readFileSync(path.join(root, 'src/data/episodes.ts'), 'utf8');
const episodeCount = (episodesSrc.match(/"link":/g) || []).length;

const featuredSrc = readFileSync(path.join(root, 'src/data/featuredEpisodes.ts'), 'utf8');
const featuredCount = (featuredSrc.match(/"link":/g) || []).length;

const urls = [
  '/',
  '/podcast',
  '/blog',
  '/about',
  '/resources',
  ...articleSlugs.map((s) => `/blog/${s}`),
  ...Array.from({ length: episodeCount }, (_, i) => `/podcast/${i}`),
  ...Array.from({ length: featuredCount }, (_, i) => `/podcast/featured/${i}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${BASE}${u}</loc></url>`).join('\n')}
</urlset>
`;

writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
console.log(`Wrote ${urls.length} URLs (${articleSlugs.length} articles, ${episodeCount} episodes, ${featuredCount} featured)`);
