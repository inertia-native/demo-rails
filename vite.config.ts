import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import rails from 'rails-vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    rails(),
  ],
  // inertia-native imports @inertiajs/core and react itself. Dedupe the shared
  // singletons so the package and the app use one Inertia router and one React.
  resolve: {
    dedupe: ['@inertiajs/core', '@inertiajs/react', 'react', 'react-dom'],
  },
})
