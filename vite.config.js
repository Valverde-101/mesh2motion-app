import { resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl' // allows us to use external shaders files to be imported into our materials

const projectDirectory = fileURLToPath(new URL('.', import.meta.url))
const bindHost = process.env.ANDROIDBUILD_BIND_HOST || '127.0.0.1'
const publicBuildMetadata = {
  WORKERS_CI_COMMIT_SHA: process.env.WORKERS_CI_COMMIT_SHA || 'local',
  WORKERS_CI_BRANCH: process.env.WORKERS_CI_BRANCH || 'local',
}

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  base: './',
  define: {
    // Only expose public build labels; never serialize the runner environment.
    PROCESS_ENV: JSON.stringify(publicBuildMetadata)
  },
  server:
    {
      host: bindHost,
      open: false
    },
  preview: {
    host: bindHost,
    open: false,
  },
  build:
    {
      outDir: '../dist',
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve(projectDirectory, 'src/index.html'),
          create: resolve(projectDirectory, 'src/create.html'),
          retarget: resolve(projectDirectory, 'src/retarget/index.html')
        }
      }
    },
  plugins:
    [
      glsl()
    ]
})
