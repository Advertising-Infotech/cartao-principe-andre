import { createRequire } from 'module';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// Bypassa o erro de resolução do esbuild em drives de rede (Z:)
// Usamos process.cwd() em vez de __dirname para evitar a duplicação de caminhos UNC
const require = createRequire(import.meta.url);
const root = process.cwd();

// Carrega o plugin via Node nativo para garantir que as sub-dependências sejam achadas
const reactModule = require('@vitejs/plugin-react');
const react = reactModule.default || reactModule;

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, root, '');
    return {
      root: './',
      base: '/',
      server: {
        port: 3001,
        host: '0.0.0.0',
        strictPort: true,
        watch: {
          usePolling: true,
          interval: 500,
          ignored: ['**/*.zip', '**/node_modules/**', '**/.git/**'],
        },
      },
      plugins: [react()],
      appType: 'spa',
      publicDir: './public',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': root,
          'react': path.join(root, 'node_modules', 'react'),
          'react-dom': path.join(root, 'node_modules', 'react-dom'),
        }
      },
      optimizeDeps: {
        entries: ['index.html'],
        include: ['react', 'react-dom']
      }
    };
});
