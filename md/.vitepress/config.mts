import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

type Note = {
  slug: string
  title: string
  updatedAt: number
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(__dirname, '..')

function resolveBase(): string {
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
  const isUserSite = repo.endsWith('.github.io')

  if (process.env.GITHUB_ACTIONS === 'true' && repo && !isUserSite) {
    return `/${repo}/`
  }

  return '/'
}

function extractTitle(markdown: string, fallback: string): string {
  const match = markdown.match(/^#{1,6}\s+(.+)$/m)
  if (!match) {
    return fallback
  }

  return match[1].trim()
}

function listNotes(): Note[] {
  const files = fs
    .readdirSync(siteRoot)
    .filter((name) => name.endsWith('.md') && name !== 'index.md')

  return files
    .map((name) => {
      const fullPath = path.join(siteRoot, name)
      const content = fs.readFileSync(fullPath, 'utf8')
      const stat = fs.statSync(fullPath)
      const slug = path.parse(name).name

      return {
        slug,
        title: extractTitle(content, slug),
        updatedAt: stat.mtimeMs
      }
    })
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

const notes = listNotes()

export default defineConfig({
  lang: 'zh-CN',
  title: 'Aoikajitsu',
  description: 'Aoi979 的技术笔记',
  base: resolveBase(),
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [{ text: '首页', link: '/' }],
    sidebar: [
      {
        text: '笔记',
        items: notes.map((note) => ({
          text: note.title,
          link: `/${note.slug}`
        }))
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/Aoi979' }],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    darkModeSwitchLabel: '切换主题',
    returnToTopLabel: '回到顶部'
  },
  markdown: {
    lineNumbers: true
  }
})
