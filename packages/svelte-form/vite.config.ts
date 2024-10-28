import { defineConfig } from "vitest/config";
import { svelte } from '@sveltejs/vite-plugin-svelte'
import packageJson from './package.json'

export default defineConfig({
    plugins: [svelte()],

    test: {
        name: packageJson.name,
        dir: './tests',
        watch: false,
        environment: 'jsdom',
        setupFiles: ['./tests/test-setup.ts'],
        coverage: {
          // There seems to be some svelte-5 incompatibility so this is disabled for now
          enabled: false,
          provider: 'istanbul',
          include: ['src/**/*'],
        },
        typecheck: { enabled: true },
      },
});
