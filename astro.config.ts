import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	base: '/bc/nuestrohogar/',
	devToolbar: { enabled: false },
	vite: { plugins: [tailwindcss()] },
})
