import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'netxpert',
  description:
    'Monorepo hub for rxjs-full-claude — an RxJS + TypeScript fullstack framework on the Vite ecosystem, deployed to Cloudflare.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: false,
  // Build into docs/dist so it matches the repo's `dist/**` Turbo outputs and
  // the Cloudflare Workers assets directory.
  outDir: 'dist',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/introduction' },
      { text: 'Packages', link: '/packages/' },
      { text: 'Roadmap', link: '/roadmap' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is netxpert?', link: '/introduction' },
            { text: 'Getting started', link: '/getting-started' },
          ],
        },
        {
          text: 'Architecture',
          items: [
            { text: 'Monorepo structure', link: '/architecture' },
            { text: 'Tooling', link: '/tooling' },
            { text: 'Cloudflare deployment', link: '/cloudflare' },
          ],
        },
        {
          text: 'Project',
          items: [{ text: 'Roadmap', link: '/roadmap' }],
        },
      ],
      '/packages/': [
        {
          text: 'Framework packages',
          items: [
            { text: 'Overview', link: '/packages/' },
            { text: '@rxjs-full/core', link: '/packages/core' },
            { text: '@rxjs-full/router', link: '/packages/router' },
            { text: '@rxjs-full/runtime', link: '/packages/runtime' },
            { text: '@rxjs-full/server', link: '/packages/server' },
            { text: '@rxjs-full/cloudflare', link: '/packages/cloudflare' },
            { text: '@rxjs-full/vite', link: '/packages/vite' },
            { text: '@rxjs-full/docs', link: '/packages/docs' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hansschenker/netxpert' }],
    search: { provider: 'local' },
    editLink: {
      pattern: 'https://github.com/hansschenker/netxpert/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Built with VitePress.',
      copyright: 'netxpert · rxjs-full-claude',
    },
  },
})
