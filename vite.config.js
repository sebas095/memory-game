import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
    test: {
      environment: 'jsdom',
    }
  }

  if (command !== 'serve') {
    config.base = '/memory-game/'
  }

  return config
})
