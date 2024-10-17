import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '2dyz9s',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
  env: {
    apiBaseUrl: 'https://fe-adv-project-together-dallaem.vercel.app/FESI3-3',
    userId: '1234@naver.com',
    password: '00000000',
  },
});
