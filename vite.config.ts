import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: 'eleva-team-development',
      apply: 'serve',
      transformIndexHtml(html) {
        return html
          .replace(/<link rel="stylesheet" href="assets\/team\/team-showcase.css"\s*\/>/, '')
          .replace('<script defer src="assets/team/team-showcase.js"></script>', '<script type="module" src="/src/team.tsx"></script>');
      },
    },
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  publicDir: false,
  build: {
    outDir: 'assets/team',
    lib: {
      entry: 'src/team.tsx',
      name: 'ElevaTeam',
      formats: ['iife'],
      fileName: () => 'team-showcase.js',
      cssFileName: 'team-showcase',
    },
    minify: true,
  },
});
