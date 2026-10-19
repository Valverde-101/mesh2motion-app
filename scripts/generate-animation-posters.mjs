import console from 'node:console'
import { spawn } from 'node:child_process'
import { readdir, stat } from 'node:fs/promises'
import { cpus } from 'node:os'
import { dirname, extname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const project_root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const preview_root = join(project_root, 'static', 'animpreviews')
const ffmpeg_path = process.env.FFMPEG_PATH || process.argv[2] || 'ffmpeg'
const force = process.argv.includes('--force')
const concurrency = Math.max(1, Math.min(2, cpus().length))

async function collect_videos (directory) {
  const files = []
  const entries = await readdir(directory, { withFileTypes: true })

  for (const entry of entries) {
    const full_path = join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await collect_videos(full_path))
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.mp4') {
      files.push(full_path)
    }
  }

  return files
}

function extract_poster (video_path, poster_path) {
  return new Promise((resolve_promise, reject_promise) => {
    const child = spawn(ffmpeg_path, [
      '-hide_banner', '-loglevel', 'error', '-y',
      '-i', video_path, '-vf', 'thumbnail=8',
      '-frames:v', '1', '-threads', '1', '-strict', 'unofficial',
      '-pix_fmt', 'yuvj420p', '-q:v', '3', poster_path
    ], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] })

    let stderr = ''
    child.stderr.setEncoding('utf8')
    child.stderr.on('data', (chunk) => { stderr += chunk })
    child.once('error', reject_promise)
    child.once('close', (code) => {
      if (code === 0) {
        resolve_promise(undefined)
      } else {
        reject_promise(new Error(`ffmpeg failed for ${video_path}: ${stderr.trim() || code}`))
      }
    })
  })
}

async function run () {
  const videos = await collect_videos(preview_root)
  const jobs = []

  for (const video_path of videos) {
    const poster_path = video_path.replace(/\.mp4$/i, '.jpg')
    if (!force) {
      try {
        const [video_info, poster_info] = await Promise.all([stat(video_path), stat(poster_path)])
        if (poster_info.mtimeMs >= video_info.mtimeMs && poster_info.size > 0) continue
      } catch (error) {
        if (error?.code !== 'ENOENT') throw error
      }
    }
    jobs.push({ video_path, poster_path })
  }

  let next_job = 0
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (next_job < jobs.length) {
      const job = jobs[next_job++]
      await extract_poster(job.video_path, job.poster_path)
    }
  }))

  console.log(`ANIMATION_POSTERS=PASS generated=${jobs.length} available=${videos.length} concurrency=${concurrency}`)
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
