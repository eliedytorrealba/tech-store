import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
              priority: 30,
            },
            {
              name: 'firebase-vendor',
              test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
              priority: 20,
            },
            {
              name: 'ui-vendor',
              test: /[\\/]node_modules[\\/](react-bootstrap|react-icons|styled-components|react-helmet-async|react-toastify)[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
